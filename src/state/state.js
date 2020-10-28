import {useReducer,useMemo,useEffect} from "react"
import firebase from '../components/firebase'
import { getWeekNumber } from "../helpers/helpers"

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
        dashboard:true,
        photoURL:null,
        env:null,
        latestProperties:[],
        favourite:[],
        activities:[],
        notifications:[],
        chart:{
            monthly:[],
            yearly:[],
            weekly:[]
        }
    }
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
            case 'GET_NOTIFICATIONS':
                return{
                    ...prevState,
                    notifications:action.payload.notifications
                }
            case 'GET_PHOTO':
                return{
                    ...prevState,
                    photoURL:action.payload.photoURL
                }
            case 'GET_LATEST':
                return{
                    ...prevState,
                    latestProperties:action.payload.latestProperties
                }
            case 'GET_ACTIVITIES':
                return{
                    ...prevState,
                    activities:action.payload.activities
                }
            case 'GET_FAVOURITE':
                return{
                    ...prevState,
                    favourite:action.payload.favourite
                }
            case 'GET_ENV':
                return{
                    ...prevState,
                    env:action.payload.env
                }
            case 'GET_CHART':
                return{
                    ...prevState,
                    chart:action.payload.chart
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
    const getLatestProperties=()=>{
        let props =[]
        firebase.getLatestProperties()
        .then(properties=>{
            properties.docs.forEach(doc=>{
                props.push({id:doc.id, ...doc.data()})
            })
            dispatch({type:'GET_LATEST', payload:{latestProperties:props}})
        })
    }
    const getHostNotifications=async(hostId)=>{
        await firebase.getHostNotifications(hostId)
         .then(data=>{
             dispatch({type:'GET_NOTIFICATIONS', payload:{notifications:data}})
         })
     }
    const getActivities =async(hostId)=>{
        return await firebase.getActivities(hostId)
          .then((res)=>{
              const data = []
              res.forEach(doc=>data.push({...doc.data(),id:doc.id}))
              dispatch({type:'GET_ACTIVITIES', payload:{activities:data}})

              let monthly = {}
              let yearly = {}
              let weekly ={}
              let years = []
              let weeks = []
              data.forEach((da)=>{
                  monthly[da.month]=(monthly[da.month] || 0)+1
                  yearly[da.year]=(yearly[da.year] || 0)+1
                  weekly[da.week]=(weekly[da.week] || 0)+1
              })
              let today = new Date();
              today = today.getFullYear();
              for(let year = today-10; year <= today; year++){
                  years = [...years,[year, (yearly[year] || 0)]]
              }
              const weekNumber = getWeekNumber()
              for(let week = weekNumber-7; week <= weekNumber; week++){
                  weeks = [...weeks,[week, (weekly[week] || 0)]]
              }
             const chart = {
                monthly:[
                    [0, (monthly[0] || 0)], 
                    [1, (monthly[1] || 0)],
                    [2, (monthly[2] || 0)],
                    [3, (monthly[3] || 0)],
                    [4, (monthly[4] || 0)],
                    [5, (monthly[5] || 0)],
                    [6, (monthly[6] || 0)],
                    [7, (monthly[7] || 0)],
                    [8, (monthly[8] || 0)],
                    [9, (monthly[9] || 0)],
                    [10, (monthly[10] || 0)],
                    [11, (monthly[11] || 0)],
                ],
                yearly:years,
                weekly:weeks
              }
              dispatch({type:'GET_CHART', payload:{chart}})
          })
      }
    //  this.context.getActivities(this.context.state.user.uid)
    //  .then(data=>{
    //      let monthly = {}
    //      let yearly = {}
    //      let weekly ={}
    //      let years = []
    //      let weeks = []
    //      data.forEach((da)=>{
    //          monthly[da.month]=(monthly[da.month] || 0)+1
    //          yearly[da.year]=(yearly[da.year] || 0)+1
    //          weekly[da.week]=(weekly[da.week] || 0)+1
    //      })
    //      let today = new Date();
    //      today = today.getFullYear();
    //      for(let year = today-10; year <= today; year++){
    //          years = [...years,[year, (yearly[year] || 0)]]
    //      }
    //      const weekNumber = getWeekNumber()
    //      for(let week = weekNumber-7; week <= weekNumber; week++){
    //          weeks = [...weeks,[week, (weekly[week] || 0)]]
    //      }
    //      this.setState({

    //  })
    //  })
    const getGeoInfo = () => {
        fetch('https://ipapi.co/json/')
        .then((response) => {
            response.json()
            .then(res=>{
                dispatch({type:'GET_ENV', payload:{env:res}})
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{

        getProperties()
        getGeoInfo()
        firebase.auth.onAuthStateChanged((user)=>{
            try{

                firebase.getUserDetails(user.uid)
                .then(userData=>{
                    dispatch({type:'RETRIVE_USER', payload:{user,userData}})
                    dispatch({type:'GET_PHOTO', payload:{photoURL:user.photoURL}})
                    if(userData.role === 0)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:true}})
                    else if(userData.role === 1)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                    else if(userData.role ===2)
                    dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                    dispatch({type:'SET_STATE', payload:{initializing:false}})
                    //load the latest properties
                    getLatestProperties()
                    getHostNotifications(user.uid)
                    getActivities(user.uid)
                    
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

    const globals=  useMemo(()=>({
        register :async(formData)=>{
           await firebase.register(formData)
           .then(async(user)=>{
                await firebase.storeData(formData,user.user)
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
        getPropertyById:async(id)=>{
           return await firebase.getPropertyById(id)
            .then(property=>{
                dispatch({type:'GET_PROPERTY', payload:{property:{id:id,...property}}}) 
                return property;
            })
        },
        setSearch:(search)=>{
            dispatch({type:'SET_SEARCH', payload:{searchQuery:search}}) 
        },
        searchProperties:async(location, checkIn, checkOut, guest)=>{
             await firebase.searchProperties(location, checkIn, checkOut, guest)
            .then(docs=>{
                let results = []
                dispatch({type:'GET_RESULTS', payload:{results:[]}})
                docs.forEach(doc=>{
                    results.push({id:doc.id, ...doc.data()})
                    dispatch({type:'GET_RESULTS', payload:{results:results}})
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
        reserveCrib:async(data)=>{
            await firebase.reserveCrib(data)
        },
        chooseDashboard:async()=>{
            await dispatch({type:'GET_DASHBOARD', payload:{dashboard:!state.dashboard}})
            return !state.dashboard
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
        uploadProfilePhoto:async(image)=>{
            await firebase.uploadProfilePhoto(state.user,image)
            .then(async(url)=>{
               await state.user.updateProfile({
                    photoURL: url
                })
                dispatch({type:'GET_PHOTO', payload:{photoURL:url}})

            })
        },
        updateProfile:async(data)=>{
            await firebase.updateProfile(data, state.user.uid)
            await firebase.getUserDetails(state.user.uid)
            .then(user=>{
                dispatch({type:'RETRIVE_USER', payload:{user:state.user,userData:user}})
            })

        },
        signOut:async()=>{
            await firebase.logout()
            .then(()=>{
                dispatch({type:'RETRIVE_USER', payload:{user:undefined,userData:undefined}})
            })
        }, 
        setDashboard:async(dashboard)=>{
            dispatch({type:'GET_DASHBOARD', payload:{dashboard:dashboard}})
        },
        getFavourite:async(ids)=>{
            await firebase.getFavourite(ids)
            .then((docs)=>{
                const fav =[]
                docs.forEach(doc=>{
                    fav.push({...doc.data(),id:doc.id})
                })
                dispatch({type:'GET_FAVOURITE', payload:{favourite:fav}})
            })
        },
        storeActivity:(property)=>{
            try{
                firebase.storeActivity(state.env.ip,property)
            }
            catch(e){}
        },

        notifications:(hostId,data)=>{
            firebase.notification(hostId,data)
        },

        state
    }),[state])
    return globals;
}
export default GlobalState;