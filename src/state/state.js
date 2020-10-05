import {useReducer,useMemo,useEffect} from "react"
import firebase from '../components/firebase'

const GlobalState= ()=>{
    const initialState={
        user:null,
        userData:null,
        initializing:true
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
            default:
                return prevState
        }
    }
    const [state, dispatch] = useReducer(reducer,initialState)
    const globals=  useMemo(()=>({
        register:(formData)=>{
           firebase.register(formData)
        },
        state
    }),[state])
    return globals;
}
export default GlobalState;