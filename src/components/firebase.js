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
            TRANSACTIONS:'transactions',
            BOOKINGS:'bookings',
            ACTIVITIES:'activities',
            NOTIFICATIONS:'notifications',
            PAYMENTS:'payments',
            BOOKED:'bookedDates'
        }
        this.serverTime = firebase.firestore.Timestamp.now().seconds
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
        await user.user.sendEmailVerification({
            url:process.env.NODE_ENV ==='development'?process.env.REACT_APP_LOCAL_URL+'/app/home':process.env.REACT_APP_PROD_URL+'/app/home'
        })
        return user;
    }
    resendVerification = async(user)=>{
        await user.sendEmailVerification({
            url:process.env.NODE_ENV ==='development'?process.env.REACT_APP_LOCAL_URL+'/app/home':process.env.REACT_APP_PROD_URL+'/app/home'
        })
    }
    storeData = async(data,user)=>{
        await this.firestore.collection(this.tables.USERS).doc(user.uid).set({firstname:data.firstname,lastname:data.lastname,email:data.email,role:data.role, status:false, balance:0,pending:0})
    }
    makeHost = async(user)=>{
        await this.firestore.collection(this.tables.USERS).doc(user.uid).update({role:2,balance:0,pending:0,income:0,withdrawn:0})
    }
    getUserDetails = async(uid)=>{
       return (await this.firestore.collection(this.tables.USERS).doc(uid).get()).data()

    }
    getHostProperties = async(hostId)=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', 'not-in', [hostId]).limit(4).get();
        return properties;
    }
    getMoreProperties = async(condition,id)=>{
        let properties = null
        if(condition === 'trending')
            if(id==='')
                properties = await this.firestore.collection(this.tables.PROPERTIES).orderBy('createdAt', 'desc').limit(16).get();
            else
                properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', '!=', id).orderBy('hostId').orderBy('createdAt', 'desc').limit(16).get();
        else if(condition === 'recommended')
            if(id === '')
                properties = await this.firestore.collection(this.tables.PROPERTIES).orderBy('rateValue', 'desc').limit(16).get();
            else
                properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', '!=', id).orderBy('hostId').orderBy('rateValue', 'desc').limit(16).get();
        return properties;
    }
    getLatestProperties = async(hostId)=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', '!=', hostId).orderBy('hostId').orderBy('createdAt', 'desc').limit(15).get();
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
                house:data.house.toLowerCase(),
                city:data.city.toLowerCase(),
                state:data.state,
                hostData:data.hostData,
                bookedDates:[],
                rateValue:0,
                totalReviewer:0,
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


    updateProperty = async(id,data)=>{
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
           await this.firestore.collection(this.tables.PROPERTIES).doc(id).update({
                name:data.name,
                description:data.description,
                amount:data.amount,
                bedroom:data.bedroom,
                smoke:data.smoke,
                wifi:data.wifi,
                parking:data.parking,
                cable:data.cable,
                bathroom:data.bathroom,
                kitchen:data.kitchen,
                inside:data.inside,
                around:data.around,
                address:data.address,
                guest:data.guest,
                type:data.type,
                house:data.house.toLowerCase(),
                city:data.city.toLowerCase(),
                state:data.state,
                updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
                keywords:searchIndex
    
            })

    }


    uploadImagesOnProp=async(data)=>{
        await this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+data.id).child(data.featuredImage.name).put(data.featuredImage)
        .then(()=>{
            this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+data.id).child(data.featuredImage.name).getDownloadURL()
            .then(async (url)=>{
                await this.firestore.collection(this.tables.PROPERTIES).doc(data.id).update({featuredImage:url})
            })
        })
    }

    uploadImagesOnPropSideView = async(data)=>{
       await this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+data.id).child(data.image.name).put(data.image)
        .then(()=>{
            this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId+'/'+data.id).child(data.image.name).getDownloadURL()
            .then(async (url)=>{
                data.images.push(url)
                await this.firestore.collection(this.tables.PROPERTIES).doc(data.id).update({images:data.images})
            })
        })
    }
    deleteUploadedImage=async(data)=>{
         this.storage.refFromURL(data.url).delete()
         .then(async() => {
             const images = data.images.filter(url=>url !== data.url);
               await this.firestore.collection(this.tables.PROPERTIES).doc(data.id).update({images:images})
        }).catch(err => console.log(err))
    }
    logout=async()=>{
        return await this.auth.signOut();
    }

    login = async(data)=>{
        return await this.auth.signInWithEmailAndPassword(data.email, data.password);
    }

    getPropertyById = async(id)=>{
        const property = await this.firestore.collection(this.tables.PROPERTIES).doc(id).get();
        const reviews = []
        await this.firestore.collection(this.tables.NOTIFICATIONS).where('propertyID', '==', property.id).where('type', '==', 'review').get()
        .then(docs=>{
            docs.forEach(doc=>reviews.push({...doc.data()}))
        })

        return {...property.data(), reviews:reviews} 
    }
    getHostPropertyById = async(id)=>{
      return await this.firestore.collection(this.tables.PROPERTIES).doc(id)
    }
    getPropertiesByType = async(type,hostId)=>{
        const properties = [];
       return await this.firestore.collection(this.tables.PROPERTIES).where('type', '==', type).where('hostId', '!=', hostId).get()
                .then(docs=>{
                    docs.forEach(doc=>properties.push({...doc.data(), id:doc.id}))
                    return properties
                })
    }
    getPropertiesByCity = async(city,hostId)=>{
        const properties = [];
       return await this.firestore.collection(this.tables.PROPERTIES).where('city', '==', city).where('hostId', '!=', hostId).get()
                .then(docs=>{
                    docs.forEach(doc=>properties.push({...doc.data(), id:doc.id}))
                    return properties
                })
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
    getBookedDates = async(propertyID)=>{
        return this.firestore.collection(this.tables.BOOKED).where('propertyID', '==', propertyID).get()
    }
    notification = async(hostId, data, type)=>{
        await this.firestore.collection(this.tables.NOTIFICATIONS).add({
            hostId:hostId,
            checkIn:data.checkIn,
            checkOut:data.checkOut,
            propertyID:data.id,
            email:data.email,
            name:data.name,
            photoURL:data.photoURL,
            hostEmail:data.hostEmail,
            status:'reserved',
            type:type,
            view:'unread',
            creactedAt:firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
    getHostNotifications = async(hostId)=>{
        const data =[]
         await this.firestore.collection(this.tables.NOTIFICATIONS).where('hostId', '==', hostId).onSnapshot(snap=>{
            snap.docs.forEach((doc,i)=>{
                if(i <= 6)
                data.push({...doc.data(), id:doc.id})
            })
           
        })
        return data;
    }
    reserveCrib = async(reserveData)=>{
       let bookedDates = []
       const dates = getDates(reserveData.checkIn, reserveData.checkOut)
    //    const data= await (await this.firestore.collection(this.tables.PROPERTIES).doc(reserveData.id).get()).data()
       bookedDates.push(...dates)
        await this.firestore.collection(this.tables.BOOKINGS).doc(reserveData.transactionID.toString()).set({
        checkIn:reserveData.checkIn,
        checkOut:reserveData.checkOut,
        amount:reserveData.total+reserveData.refund,
        propertyID:reserveData.id,
        email:reserveData.renterEmail,
        name:reserveData.fullname,
        transactionID:reserveData.transactionID,
        userId:reserveData.userId,
        propertyName:reserveData.propertyName,
        propertyState:reserveData.propertyState,
        propertyCity:reserveData.propertyCity,
        bookedDates:bookedDates,
        status:'success',
        creactedAt:firebase.firestore.FieldValue.serverTimestamp(),
        
    })
    
    await this.firestore.collection(this.tables.BOOKED).add({
        propertyID:reserveData.id,
        bookedDates:bookedDates,
    })

    //    await this.firestore.collection(this.tables.PROPERTIES).doc(reserveData.id)
    //     .update({
    //         bookedDates:bookedDates
    //     })
        .then(async()=>{
            // await this.firestore.collection(this.tables.BOOKINGS).doc(reserveData.transactionID.toString()).update({
            //     status:'success',
            // })
            // await this.firestore.collection(this.tables.TRANSACTIONS).add({
            //     amount:reserveData.total*0.9,
            //     propertyID:reserveData.id,
            //     name:reserveData.fullname,
            //     transactionID:reserveData.transactionID,
            //     userId:reserveData.userId,
            //     hostId:reserveData.hostId
            // })
            // .then(()=>{
                this.firestore.collection(this.tables.USERS).doc(reserveData.hostId).get()
                .then(host=>{
                    this.firestore.collection(this.tables.USERS).doc(reserveData.hostId).update({balance:host.data().balance+reserveData.total*0.9, income:host.data().income+reserveData.total*0.9})
                })
            //})
        })
        .catch(async(e)=>{
            await this.firestore.collection(this.tables.BOOKINGS).doc(reserveData.transactionID.toString())
            .update({
                status:'failed'
            })
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
    favourite = async(ip,property)=>{
        try{
            await this.firestore.collection(ip.toString()).doc(property.id)
            .set({...property})
        }
        catch(e){
            console.log(e)
        }
    }

    getFavourite=async(ids)=>{
        try{
          return await this.firestore.collection(this.tables.PROPERTIES).where('id','in',ids).get()

        }
        catch(e){
            console.log(e)
        }
    }
    storeActivity = (ip, property)=>{
        try{
            const today = new Date(this.serverTime*1000)
            const onejan = new Date(today.getFullYear(), 0, 1);
            const weekNumber = Math.ceil( (((today.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 )
            this.firestore.collection(this.tables.ACTIVITIES).doc(property.id+today.getDate().toString()+today.getMonth().toString()+today.getFullYear().toString()+ip)
            .set({
                ip:ip,
                propertyId:property.id,
                hostId:property.hostId,
                day:today.getDate(),
                month:today.getMonth(),
                year:today.getFullYear(),
                week:weekNumber,
                createdAt:firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        catch(e){}
    }
    getActivities = async(hostId)=>{
        try{
            const today = new Date(this.serverTime*1000)
            return await this.firestore.collection(this.tables.ACTIVITIES).where('hostId', '==', hostId)
            .where('year', '==', today.getFullYear())
            .get()
        }
        catch(e){}
    }

    getHistories = (userId)=>{
        return  this.firestore.collection(this.tables.BOOKINGS).where('userId','==',userId)
    
    }
    deleteHistory =async(ids)=>{
        try{
            await this.firestore.collection(this.tables.BOOKINGS).where('transactionID', 'in', ids).get()
            .then(docs=>{
                docs.forEach(async(doc)=>{
                    await this.firestore.collection(this.tables.BOOKINGS).doc(doc.id).delete()
                })
            })
        }
        catch(e){}
    }
    withdraw = async(data)=>{
        try{
            const pending = Number(data.amount)
            const date = new Date(this.serverTime*1000)
            const transId = firebase.firestore.Timestamp.now().nanoseconds;
           await this.firestore.collection(this.tables.PAYMENTS).doc(transId.toString()).set({
                hostId:data.hostId,
                amount:pending,
                status:'pending',
                type:data.type,
                details:{...data.details},
                createdAt:this.serverTime,
                year:date.getFullYear(),
                month:date.getMonth(),
                transactionID:transId
            })
            await this.firestore.collection(this.tables.USERS).doc(data.hostId).update({
                balance:(data.balance - pending),
                pending:(data.pending+pending)
            })
            return {
                balance:(data.balance - pending),
                pending:data.pending+pending,
                hostId:data.hostId,
                amount:pending,
                status:'pending',
                type:data.type,
                details:{...data.details},
                createdAt:this.serverTime,
                year:date.getFullYear(),
                month:date.getMonth(),
                transactionID:transId    
            }
        }catch(e){}
    }

    approveWithdrawal = async(transId,hostId,amount)=>{
        await this.firestore.collection(this.tables.PAYMENTS).doc(transId).update({status:'processed'})
        .then(async()=>{
            const user = await (await this.firestore.collection(this.tables.USERS).doc(hostId).get()).data() 
            this.firestore.collection(this.tables.USERS).doc(hostId).update({withdrawn:user.withdrawn+amount,pending:user.pending-amount})
        })
    }
    getPaymentHistory=async(hostId)=>{
        return await this.firestore.collection(this.tables.PAYMENTS).where('hostId', '==', hostId).get()
        .then(docs=>{
            const payments =[]
            docs.forEach(doc=>payments.push({...doc.data(),id:doc.id}))
            return payments;
        })
    }

    sendReview = async(data)=>{
        await this.firestore.collection(this.tables.NOTIFICATIONS).add({
            // hostId:data.hostId,
            checkIn:data.checkIn,
            checkOut:data.checkOut,
            propertyID:data.propertyID,
            email:data.email,
            name:data.name,
            photoURL:data.photoURL,
            review:data.review,
            rating:data.rating,
            status:'submited',
            type:'review',
            view:'unread',
            creactedAt:firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(async()=>{
        await this.firestore.collection(this.tables.BOOKINGS).doc(data.historyId.toString()).update({
                reviewed:true,
                review:data.review,
                rating:data.rating
            })
        })
        const property = await (await this.firestore.collection(this.tables.PROPERTIES).doc(data.propertyID).get()).data()
        await this.firestore.collection(this.tables.PROPERTIES).doc(data.propertyID).update({
            rateValue:Number(data.rating)+property.rateValue,
            totalReviewer:Number(property.totalReviewer)+1

        })
    }
}
export default new Firebase();