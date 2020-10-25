import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import {getDates} from '../helpers/helpers'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
 class Firebase {
    constructor(){
        this.app = firebase.initializeApp(firebaseConfig)
        this.auth = this.app.auth()
        this.firestore = this.app.firestore()
        this.storage = this.app.storage()
        this.tables = {
            PROPERTIES :'properties',
            USERS:'users',
            TRANSACTIONS:'transactions'
        }
        // Date.prototype.addDays = function(days) {
        //     let date = new Date(this.valueOf());
        //     date.setDate(date.getDate() + days);
        //     return date;
        // }
    }
    
    register=async(data)=>{
         const user =  await this.auth.createUserWithEmailAndPassword(data.email,data.password)
         
         await user.user.updateProfile({
            displayName:data.firstname
        })
        return user;
    }
    storeData = async(data,user)=>{
        await this.firestore.collection(this.tables.USERS).doc(user.uid).set({firstname:data.firstname,lastname:data.lastname,email:data.email,role:data.role, status:false})
    }
    makeHost = async(user)=>{
        await this.firestore.collection(this.tables.USERS).doc(user.uid).update({role:2})
    }
    getUserDetails = async(uid)=>{
        const data = (await this.firestore.collection(this.tables.USERS).doc(uid).get()).data()
      return data
    }
    getHostProperties = async()=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).limit(4).get();
        return properties;
    }
    getLatestProperties = async()=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).orderBy('createdAt', 'desc').limit(15).get();
        return properties;
    }
    getMyProperties = async(hostId)=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', '==', hostId).get();
        return properties; 
    }
    storeProperty = async(data)=>{
        let searchIndex = [];
        const allString = data.address+' '+data.city+' '+data.state
        const string = allString.toLowerCase().split(' ');
        string.forEach(word=>{
            let newWord = ''
            for(let i=0;i<word.length; i++){
                newWord +=word.charAt(i)
                searchIndex.push(newWord)
            }
        })
         let images = []
         let image=null
           const post = await this.firestore.collection(this.tables.PROPERTIES).add({
                hostId:data.hostId,
                name:data.name,
                description:data.description,
                images:images,
                featuredImage:image,
                amount:data.amount,
                bedroom:data.bedroom,
                discount:data.discount,
                smoke:data.smoke,
                availability:true,
                wifi:data.wifi,
                parking:data.parking,
                cable:data.cable,
                bathroom:data.bathroom,
                kitchen:data.kitchen,
                inside:data.inside,
                around:data.around,
                reviews:[],
                address:data.address,
                guest:data.guest,
                type:data.type,
                house:data.house,
                city:data.city,
                state:data.state,
                hostData:data.hostData,
                checkIn:[],
                checkOut:[],
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
                keywords:searchIndex
    
            })
           await this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+post.id).child(data.featuredImage.name).put(data.featuredImage)
            .then(()=>{
                this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+post.id).child(data.featuredImage.name).getDownloadURL()
                .then(async (url)=>{
                    await this.firestore.collection(this.tables.PROPERTIES).doc(post.id).update({featuredImage:url})
                })
            })
            for(let i= 0; i<data.images.length; i++){
                this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+post.id).child(data.images[i].name).put(data.images[i])
                .then(()=>{
                    this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+post.id).child(data.images[i].name).getDownloadURL()
                    .then(async (url)=>{
                        images.push(url)
                        await this.firestore.collection(this.tables.PROPERTIES).doc(post.id).update({images:images})
                    })
                })
            }


        // return property.get()
    }

    logout=async()=>{
        return await this.auth.signOut();
    }

    login = async(data)=>{
        return await this.auth.signInWithEmailAndPassword(data.email, data.password);
    }

    getPropertyById = async(id)=>{
        const property = await (await this.firestore.collection(this.tables.PROPERTIES).doc(id).get()).data();
        return property 
    }
    searchProperties = async (location, checkIn, checkOut, guest=0)=>{
        // this.firestore.collection(this.tables.PROPERTIES)
        // .get()
        // .then(docs=>{
        //     docs.forEach(doc=>results.push({id:doc.id, ...doc.data()}))
        //    const dat= results.filter(result=>result.address.toLowerCase().includes(location.toLowerCase()))
        //    console.log(dat)
        // })
        return await this.firestore.collection(this.tables.PROPERTIES)
        .where('keywords','array-contains', location.toLowerCase())
        .get()

       
    }

    reserveCrib = async(id, checkIn, checkOut)=>{
       let bookedDates = []
       const dates = getDates(checkIn, checkOut)
       const data= await (await this.firestore.collection(this.tables.PROPERTIES).doc(id).get()).data()
       bookedDates.push(...data.bookedDates, ...dates)
        return await this.firestore.collection(this.tables.PROPERTIES).doc(id)
        .update({
            bookedDates:bookedDates
        })

    }

    uploadProfilePhoto = async(user, image)=>{
        await this.storage
        .ref('profile/'+user.uid)
        .put(image);
          // set progress state
           // task.on('state_changed', snapshot => {
          // setURI(uri)
          // setData({
          //     ...data,
          //     camera:false,
          // transfered: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // });
        //   })
          return  await this.storage.ref('profile/'+user.uid).getDownloadURL()
    }
    updateProfile = async(data, id)=>{
       await this.firestore.collection(this.tables.USERS).doc(id).update({
            phone:data.phone,
            address:data.address,
            bio:data.bio,
            linkedin:data.linkedin,
            facebook:data.facebook,
            dob:data.dob,
            gender:data.gender,
            status:true
        })
    }
}
export default new Firebase();