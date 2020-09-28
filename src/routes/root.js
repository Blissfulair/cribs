import React from "react";
import {Route,Switch} from "react-router-dom"
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
const Root = ()=>{
    return(
        <Switch>
            <Route path="/search">
                <Search/>
            </Route>
            <Route path="/single">
                <Single/>
            </Route>
            <Route path="/">
                <Index/>
            </Route>
        </Switch>
    )
}
export default Root;