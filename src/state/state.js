import {useReducer,useMemo,useEffect} from "react"
import firebase from '../components/firebase'

const GlobalState= ()=>{
    const initialState={
        user:undefined,
        userData:undefined,
        initializing:true,
        properties:[],
        property:null,
        myProperties:[],
        results:[],
        searchQuery:null,
        dashboard:true
    }
   const getProperties=()=>{
        let props =[]
        firebase.getHostProperties()
        .then(properties=>{
            properties.docs.forEach(doc=>{
                props.push({id:doc.id, ...doc.data()})
            })
            dispatch({type:'GET_PROPERTIES', payload:{properties:props}})
        })
    }
    useEffect(()=>{

        getProperties()
        firebase.auth.onAuthStateChanged((user)=>{
            try{
                firebase.getUserDetails(user.uid)
                .then(userData=>{
                    dispatch({type:'RETRIVE_USER', payload:{user,userData}})
                    if(userData.role === 0)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:true}})
                    else if(userData.role === 1)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                    else if(userData.role ===2)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                    dispatch({type:'SET_STATE', payload:{initializing:false}})
                    
                })
            }
            catch(e){
                dispatch({type:'RETRIVE_USER', payload:{user:null, userData:null}})
                dispatch({type:'SET_STATE', payload:{initializing:false}})
            }
            // if(user){


            //     dispatch({type:'RETRIVE_USER', payload:{user}})
            // }
            // else{
            //     dispatch({type:'RETRIVE_USER', payload:{user:null, userData:null}})
            // }
        })
    },[])
    const reducer = (prevState, action)=>{
        switch(action.type){
            case 'RETRIVE_USER':
                return{
                    ...prevState,
                    user:action.payload.user,
                    userData:action.payload.userData
                }
            case 'SET_STATE':
                return{
                    ...prevState,
                    initializing:action.payload.initializing
                }
            case 'SET_SEARCH':
                return{
                    ...prevState,
                    searchQuery:action.payload.searchQuery
                }
            case 'GET_PROPERTIES':
                return{
                    ...prevState,
                    properties:action.payload.properties
                }
            case 'GET_PROPERTY':
                return{
                    ...prevState,
                    property:action.payload.property
                }
            case 'GET_RESULTS':
                return{
                    ...prevState,
                    results:action.payload.results
                }
            case 'GET_MY_PROPERTIES':
                return{
                    ...prevState,
                    myProperties:action.payload.myProperties
                }
            case 'GET_DASHBOARD':
                return{
                    ...prevState,
                    dashboard:action.payload.dashboard
                }
            default:
                return prevState
        }
    }
    const [state, dispatch] = useReducer(reducer,initialState)
    const globals=  useMemo(()=>({
        register :async(formData)=>{
           await firebase.register(formData)
           .then((user)=>{
                 firebase.storeData(formData,user.user)
                 firebase.getUserDetails(user.user.uid)
                 .then(userData=>{
                    dispatch({type:'RETRIVE_USER', payload:{user:user.user,userData}})
                    if(userData.role === 0)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:true}})
                    else if(userData.role === 1)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                    else if(userData.role ===2)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                 })
           })
    
        },
        login:async(data)=>{
            await firebase.login(data)
            .then(async(user)=>{
               await firebase.getUserDetails(user.user.uid)
                .then(userData=>{
                   dispatch({type:'RETRIVE_USER', payload:{user:user.user,userData}})
                   if(userData.role === 0)
                   dispatch({type:'GET_DASHBOARD', payload:{dashboard:true}})
                   else if(userData.role === 1)
                   dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                   else if(userData.role ===2)
                   dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                })
            })
        },
        getProperties:()=>{
            let props =[]
            firebase.getHostProperties()
            .then(properties=>{
                properties.docs.forEach(doc=>{
                    props.push({id:doc.id, ...doc.data()})
                })
                dispatch({type:'GET_PROPERTIES', payload:{properties:props}})
            })
        },
        getMyProperties:()=>{
            let props =[]
            firebase.getMyProperties(state.user.uid)
            .then(properties=>{
                properties.docs.forEach(doc=>{
                    props.push({id:doc.id, ...doc.data()})
                })
                dispatch({type:'GET_MY_PROPERTIES', payload:{myProperties:props}})
            })
        },
        getPropertyById:(id)=>{
            firebase.getPropertyById(id)
            .then(property=>{
                dispatch({type:'GET_PROPERTY', payload:{property:{id:id,...property}}}) 
            })
        },
        setSearch:(search)=>{
            dispatch({type:'SET_SEARCH', payload:{searchQuery:search}}) 
        },
        searchProperties:async(location, checkIn, checkOut, guest, history)=>{
             await firebase.searchProperties(location, checkIn, checkOut, guest)
            .then(docs=>{
                let results = []
                dispatch({type:'GET_RESULTS', payload:{results:[]}})
                docs.forEach(doc=>{
                    results.push({id:doc.id, ...doc.data()})
                    dispatch({type:'GET_RESULTS', payload:{results:results}})
                })
                history.push({
                    pathname: '/search',
                    search: `?location=${location}&check-in=${checkIn}&check-out=${checkOut}&guest=${guest}`
                })

            })
        },
        onLoadSearch:async(data)=>{
            await firebase.searchProperties(data.location, data.checkIn, data.checkOut, data.guest)
            .then(docs=>{
                let results = []
                docs.forEach(doc=>{
                    results.push({id:doc.id,...doc.data()})
                    dispatch({type:'GET_RESULTS', payload:{results:results}})
                })

            })
        },
        reserveCrib:(id, checkIn, checkOut)=>{
            firebase.reserveCrib(id, checkIn, checkOut)
        },
        chooseDashboard:()=>{
            dispatch({type:'GET_DASHBOARD', payload:{dashboard:!state.dashboard}})
        },
        makeHost:async()=>{
            await firebase.makeHost(state.user)
            .then(async()=>{
               await firebase.getUserDetails(state.user.uid)
                .then(user=>{
                    dispatch({type:'RETRIVE_USER', payload:{user:state.user,userData:user}})
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                })
            })
        },
        state
    }),[state])
    return globals;
}
export default GlobalState;