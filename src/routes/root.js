import React from "react";
import {Route,Switch} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
const Root = ()=>{
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
            <Route path="/single">
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
export default Root;