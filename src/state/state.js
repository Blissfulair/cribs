import {useReducer,useMemo,useEffect} from "react"
import firebase from '../components/firebase'

const GlobalState= ()=>{
    const initialState={
        user:null,
        userData:null,
        initializing:true,
        properties:[],
        property:null,
        myProperties:[],
        results:[],
        searchQuery:null
    }

    useEffect(()=>{


        firebase.auth.onAuthStateChanged((user)=>{
            dispatch({type:'SET_STATE', payload:{initializing:false}})
            if(user){
                firebase.getUserDetails(user.uid)
                .then(userData=>{
                    dispatch({type:'RETRIVE_USER', payload:{user,userData}})
                })
                dispatch({type:'RETRIVE_USER', payload:{user}})
            }
            else{
                dispatch({type:'RETRIVE_USER', payload:{user:null}})
            }
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
            default:
                return prevState
        }
    }
    const [state, dispatch] = useReducer(reducer,initialState)
    const globals=  useMemo(()=>({
        register:(formData)=>{
           firebase.register(formData)
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
                dispatch({type:'GET_PROPERTY', payload:{property}}) 
            })
        },
        setSearch:(search)=>{
            dispatch({type:'SET_SEARCH', payload:{searchQuery:search}}) 
        },
        searchProperties:(location, checkIn, checkOut, guest, history)=>{
            firebase.searchProperties(location, checkIn, checkOut, guest)
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
        onLoadSearch:(data)=>{
            firebase.searchProperties(data.location, data.checkIn, data.checkOut, data.guest)
            .then(docs=>{
                let results = []
                docs.forEach(doc=>{
                    results.push(doc.data())
                    dispatch({type:'GET_RESULTS', payload:{results:results}})
                })

            })
        },
        state
    }),[state])
    return globals;
}
export default GlobalState;