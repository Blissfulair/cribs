import React, {useContext} from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Footer from './footer';
import Header from './header';
import Root from "../routes/root";
import ScrollTop from "./scrollTop";
import Auth from "../routes/auth";
import AppContext from "../state/context";
import Splash from "./splash";

const Navigation =()=>{
    const {state} = useContext(AppContext)
    return(
        <Router>
            {
                state.initializing && state.userData === undefined?
                <Splash/>
                :
                <>
                    <Header/>
                        <ScrollTop>
                        {
                                state.userData?<Auth/>
                                :
                                <Root user={state.userData}/>
                            }

                        </ScrollTop>
                    <Footer/>
                </>
            }
        </Router>
    )
}
export default Navigation;