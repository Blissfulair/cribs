import React from "react";
import {Route,Switch,withRouter} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
const Root = ({location,history})=>{
    // const path = location.pathname;
    // useEffect(()=>{
        
    //     if(!path.includes('app')){
    //         if(path)
    //         history.push(path)
    //         else
    //         history.push('/')

    //     }
    //     else
    //     history.push('/')

    // },[history,path])
    return(
        <Switch>
            <Route path='/payment' >
                <Payment/>
            </Route>
            <Route path='/register' >
                <SignUp/>
            </Route>
            <Route path="/search">
                <Search/>
            </Route>
            <Route path="/crib/:id">
                <Single/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/">
                <Index/>
            </Route>
            
        </Switch>
    )
}
export default withRouter(Root);