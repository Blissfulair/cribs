import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Footer from './footer';
import Header from './header';
import Root from "../routes/root";

const Navigation =()=>{
    return(
        <Router>
            <Header/>
                <Root/>
            <Footer/>
        </Router>
    )
}
export default Navigation;