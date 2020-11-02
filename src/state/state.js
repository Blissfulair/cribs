import {useReducer,useMemo,useEffect} from "react"
import firebase from '../components/firebase'
import { getWeekNumber, setDashboard, getDashboard } from "../helpers/helpers"

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
        histories:[],
        earnings:{
            balance:0,
            pending:0,
        },
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
            case 'GET_EARNINGS':
                return{
                    ...prevState,
                    earnings:action.payload.earnings
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
            case 'GET_HISTORIES':
                return{
                    ...prevState,
                    histories:action.payload.histories
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
   const getProperties=(userId)=>{
        let props =[]
        firebase.getHostProperties(userId)
        .then(properties=>{
            properties.docs.forEach(doc=>{
                props.push({id:doc.id, ...doc.data()})
            })
            dispatch({type:'GET_PROPERTIES', payload:{properties:props}})
        })
    }
    const getLatestProperties=(userId)=>{
        let props =[]
        firebase.getLatestProperties(userId)
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

    // const  getEarnings=async(hostId)=>{
    //     return await firebase.getIncome(hostId)
    //       .then((res)=>{
    //           let net = 0
    //           res.forEach(doc=>{
    //                 const data = doc.data()
    //                 net += data.amount*0.9
    //           })
    //           console.log(net)
    //           dispatch({type:'GET_EARNINGS', payload:{earnings:{net:net}}})
    //       })
    //   }
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
                    {
                        dispatch({type:'GET_DASHBOARD', payload:{dashboard:false}})
                        dispatch({type:'GET_EARNINGS', payload:{earnings:{ balance:userData.balance, pending:userData.pending}}})
                    }
                    else if(userData.role ===2)
                    {
                        const dash = getDashboard()
                        dispatch({type:'GET_DASHBOARD', payload:{dashboard:dash}})
                        dispatch({type:'GET_EARNINGS', payload:{earnings:{ balance:userData.balance, pending:userData.pending}}})
                    }

                    dispatch({type:'SET_STATE', payload:{initializing:false}})
                    //load the latest properties
                    getLatestProperties(user.uid)
                    getProperties(user.uid)
                    getHostNotifications(user.uid)
                    getActivities(user.uid)
                    
                })
            }
            catch(e){
                dispatch({type:'RETRIVE_USER', payload:{user:null, userData:null}})
                dispatch({type:'SET_STATE', payload:{initializing:false}})
                getProperties('')
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
            let results = []
             await firebase.searchProperties(location, checkIn, checkOut, guest)
            .then(docs=>{
                docs.forEach(doc=>{
                    const result = doc.data()
                    const checkOutarr = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(checkOut).toDateString())
                    const checkInarr = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(checkIn).toDateString())
                    if(checkInarr.length<1 && checkOutarr.length<1)
                    results.push({id:doc.id,...result})
                })
            })
            dispatch({type:'GET_RESULTS', payload:{results:results}})
        },
        onLoadSearch:async(data)=>{
            let results = []
           return await firebase.searchProperties(data.location, data.checkIn, data.checkOut, data.guest)
            .then(docs=>{
                docs.forEach(doc=>{
                    const result = doc.data()
                    const checkOut = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(data.checkOut).toDateString())
                    const checkIn = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(data.checkIn).toDateString())
                    if(checkIn.length<1 && checkOut.length<1)
                    results.push({id:doc.id,...result})
                })
                dispatch({type:'GET_RESULTS', payload:{results:results}})
                return results;

            })
        },
        reserveCrib:async(data)=>{
            await firebase.reserveCrib(data)
        },
        chooseDashboard:async()=>{
            await dispatch({type:'GET_DASHBOARD', payload:{dashboard:!state.dashboard}})
                setDashboard(!state.dashboard)
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

        notifications:(hostId,data,type)=>{
            firebase.notification(hostId,data,type)
        },
        getHistories:async(userId)=>{
             await  firebase.getHistories(userId)
             .then(data=>{
                 console.log(data)
                     dispatch({type:'GET_HISTORIES', payload:{data}})
                     return data
                 })

         },
         deleteHistory:async(ids)=>{
            await firebase.deleteHistory(ids)
         },
         withdrawal: async(data)=>{
            return await firebase.withdraw(data)
             .then(res=>{
                dispatch({type:'GET_EARNINGS', payload:{earnings:{balance:res.balance, pending:res.pending}}})
                
                return res;
             })
         },
         approveWithdrawal:async(transId,hostId,amount)=>{
            await firebase.approveWithdrawal(transId,hostId,amount)
         },
         getPaymentHistory:async()=>{
            return await firebase.getPaymentHistory(state.user.uid)
            .then(histories=>histories)
         },
         sendReview:async(data)=>{
            await firebase.sendReview(data);
         },
         getPropertiesByType:async(type)=>{

             await firebase.getPropertiesByType(type, state.user?state.user.uid:'')
             .then(results=>{
                dispatch({type:'GET_RESULTS', payload:{results:results}})
             })
         },
         getPropertiesByCity:async(city)=>{

            await firebase.getPropertiesByCity(city, state.user?state.user.uid:'')
            .then(results=>{
               dispatch({type:'GET_RESULTS', payload:{results:results}})
            })
        },
        state
    }),[state])
    return globals;
}
export default GlobalState;