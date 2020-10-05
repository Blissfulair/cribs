import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
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
            USERS:'user',
            TRANSACTIONS:'transactions'
        }
    }

    register=async(data)=>{
         const user =  await (await this.auth.createUserWithEmailAndPassword(data.email,data.password)).user.updateProfile({
            displayName:data.firstname
        })
        await this.firestore.collection(this.tables.USERS).doc(user.user.uid).set({firstname:data.firstname,lastname:data.lastname,email:data.email})
        return user;
    }
    getUserDetails = async(uid)=>{
        const data = (await this.firestore.collection(this.tables.USERS).doc(uid).get()).data()
        
      return data
    }
    getHostProperties = async(uid=null)=>{
        let properties = null
        properties = await this.firestore.collection(this.tables.PROPERTIES).where('hostId', '==', uid).orderBy('createdAt', 'desc').get();
        return properties;
    }
    storeProperty = async(data)=>{
        let images = []
        data.images.forEach((image,i)=>{
            this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId).child(image.files[i].name).put(image.files[i].file)
            .then(()=>{
                this.storage.ref(this.tables.PROPERTIES+'/'+data.hostId).getDownloadURL()
                .then(url=>{
                    images.push(url)
                })
            })
        })
       const property = await this.firestore.collection(this.tables.PROPERTIES).add({
            hostId:data.hostId,
            name:data.name,
            description:data.description,
            images:images,
            amount:data.amount
        })
        return property.get()
    }

    logout=async()=>{
        return await this.auth.signOut();
    }

    login = async(data)=>{
        return await this.auth.signInWithEmailAndPassword(data.email, data.password);
    }
}
export default new Firebase();