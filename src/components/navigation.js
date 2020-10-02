import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Footer from './footer';
import Header from './header';
import Root from "../routes/root";
import ScrollTop from "./scrollTop";

const Navigation =()=>{
    return(
        <Router>
            <Header/>
                <ScrollTop>
                    <Root/>
                </ScrollTop>
            <Footer/>
        </Router>
    )
}
export default Navigation;