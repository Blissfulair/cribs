import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Index from "../pages/index"
import Footer from './footer';
import Header from './header';

const Navigation =()=>{
    return(
        <Router>
            <Header/>
            <Switch>
                <Route path="/">
                    <Index/>
                </Route>
            </Switch>
            <Footer/>
        </Router>
    )
}
export default Navigation;