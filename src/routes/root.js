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
import Setting from "../pages/app/host/setting";
import RentSetting from "../pages/app/renter/setting";
import Profile from "../pages/app/host/profile";
import RentProfile from "../pages/app/renter/profile";
import Review from "../pages/app/review";
import EditProfile from "../pages/app/host/editProfile";
import RentEditProfile from "../pages/app/renter/editProfile";
import Home from "../pages/app/home";
import PrivateSearch from "../pages/app/search";
import PrivateSingle from "../pages/app/single";
import PrivatePayment from "../pages/app/payment";
import Favourites from "../pages/app/host/favourites";
import History from "../pages/app/renter/history";
import PublicRoute from "./publicRoute";
import RentRoute from "./privateRoute";
import HostRoute from "./auth";
import More from "../pages/app/more";
class Root extends Component{

    render(){
    return(
        <Switch>


            <HostRoute exact component={Dashboard} path='/app/dashboard' />
            <HostRoute exact component={Properties} path='/app/property' />
            <HostRoute exact path='/app/add-property' component={AddProperty} />
            <HostRoute exact component={EditProperty} path='/app/edit-property/:id' />
            <HostRoute exact path='/app/withdraws' component={DashboardPayment} />
            <RentRoute exact path='/app/history' component={History} />
            <RentRoute exact path='/app/favourites' component={Favourites} />
            <RentRoute exact path='/app/search' component={PrivateSearch} />
            <RentRoute exact path='/app/payment' component={PrivatePayment} />
            <RentRoute exact path='/app/crib/:id' component={PrivateSingle} />
            <RentRoute exact path='/app/reviews' component={Review} />
            <RentRoute exact path='/app/home' component={Home} />
            <HostRoute exact path='/app/settings' component={Setting} />
            <RentRoute exact path='/app/setting' component={RentSetting} />
            <HostRoute exact path='/app/profile' component={Profile} />
            <RentRoute exact path='/app/myprofile' component={RentProfile} />
            <RentRoute exact path='/app/more-cribs' component={More} />
            <HostRoute exact path='/app/edit-profile' component={EditProfile} />
            <RentRoute exact path='/app/edit-myprofile' component={RentEditProfile} />
            <HostRoute exact path='/app/inbox' component={Inbox} />
            <HostRoute exact path='/app/calendar' component={DashboardCalendar} />
            







            <PublicRoute exact path='/payment' component={Payment} />
            <PublicRoute exact path='/register' component={SignUp} />
            <PublicRoute exact path="/search" component={Search}/>
            <PublicRoute exact path="/crib/:id" component={Single}/>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path='/more-cribs' component={More} />

            <PublicRoute exact path="/" component={Index} />
            
        </Switch>
    )
}
}
export default Root;