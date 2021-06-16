import { createStore } from "redux";
import rootReducer from "./reducers";

function configureStore(state = { 
  auth: false,
  user:null
 }) {
  return createStore(rootReducer,state);
}
export default configureStore;