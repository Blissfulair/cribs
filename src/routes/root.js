import React, {Component} from "react";
import {Switch} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Dashboard from "../pages/app/dashboard";
import Properties from "../pages/app/properties";
import AddProperty from "../pages/app/addProperty";
import DashboardPayment from "../pages/app/DashboardPayment";
import DashboardCalendar from "../pages/app/DashboardCalendar";
import EditProperty from "../pages/app/editProperty";
import Inbox from "../pages/app/inbox";
import Setting from "../pages/app/setting";
import Profile from "../pages/app/profile";
import Review from "../pages/app/review";
import EditProfile from "../pages/app/editProfile";
import Home from "../pages/app/home";
import PrivateSearch from "../pages/app/search";
import PrivateSingle from "../pages/app/single";
import PrivatePayment from "../pages/app/payment";
import Favourites from "../pages/app/host/favourites";
import History from "../pages/app/renter/history";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
class Root extends Component{

    render(){
    return(
        <Switch>


            <PrivateRoute exact component={Dashboard} path='/app/dashboard' />
            <PrivateRoute exact component={Properties} path='/app/property' />
            <PrivateRoute exact path='/app/add-property' component={AddProperty} />
            <PrivateRoute exact component={EditProperty} path='/app/edit-property' />
            <PrivateRoute exact path='/app/withdraws' component={DashboardPayment} />
            <PrivateRoute exact path='/app/history' component={History} />
            <PrivateRoute exact path='/app/favourites' component={Favourites} />
            <PrivateRoute exact path='/app/search' component={PrivateSearch} />
            <PrivateRoute exact path='/app/payment' component={PrivatePayment} />
            <PrivateRoute exact path='/app/crib' component={PrivateSingle} />
            <PrivateRoute exact path='/app/reviews' component={Review} />
            <PrivateRoute exact path='/app/home' component={Home} />
            <PrivateRoute exact path='/app/settings' component={Setting} />
            <PrivateRoute exact path='/app/profile' component={Profile} />
            <PrivateRoute exact path='/app/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/app/inbox' component={Inbox} />
            <PrivateRoute exact path='/app/calendar' component={DashboardCalendar} />
            







            <PublicRoute exact path='/payment' component={Payment} />
            <PublicRoute exact path='/register' component={SignUp} />
            <PublicRoute exact path="/search" component={Search}/>
            <PublicRoute exact path="/crib/:id" component={Single}/>
            <PublicRoute exact path="/login" component={Login} />

            <PublicRoute exact path="/" component={Index} />
            
        </Switch>
    )
}
}
export default Root;