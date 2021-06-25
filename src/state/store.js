import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { getDashboard, setDashboard } from "../helpers/helpers";

function configureStore(preload) {
  if(preload.user)
    setDashboard(preload.user.role)
  const state = { 
    auth: false,
    user:null,
    env: null,
    properties:[],
    histories:[],
    favourites:[],
    trendingCribs:[],
    bestCribs:[],
    propertyTypes:[],
    notifications:[],
    crib:null,
    amenities:[],
    states:[],
    chart:{
      monthly:[],
      weekly:[],
      yearly:[]
    },
    dashboard:getDashboard(),
    ...preload,
   }
  return createStore(rootReducer,state,applyMiddleware(loadingBarMiddleware()));
}
export default configureStore;