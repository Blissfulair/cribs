import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import {setDashboard } from "../helpers/helpers";

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
    searchData:{
      location: '',
      checkIn: '',
      checkOut: '',
      guest: 0,
      children:0,
      adult:0,
      infant:0,
      pet:false,
    },
    searches:[],
    crib:null,
    amenities:[],
    states:[],
    chart:{
      monthly:[],
      weekly:[],
      yearly:[]
    },
    earnings:{
      balance:0
    },
    dashboard:false,
    ...preload,
   }
  return createStore(rootReducer,state,applyMiddleware(loadingBarMiddleware()));
}
export default configureStore;