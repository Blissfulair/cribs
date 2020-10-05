import React, {useEffect} from "react";
import {Route,Switch,withRouter} from "react-router-dom"
import Dashboard from "../pages/app/dashboard";
import Properties from "../pages/app/properties";
const Auth = ({history, location})=>{
    const path = location.pathname;
useEffect(()=>{
    
    if(path.includes('app')){
        history.push(path)
    }
    else{
        history.push('/app/dashboard')
    }
},[history,path])
    return(
        <Switch>
            <Route path='/app/dashboard' >
                <Dashboard/>
            </Route>
            <Route path='/app/property' >
                <Properties/>
            </Route>
            
        </Switch>
    )
}
export default withRouter(Auth);