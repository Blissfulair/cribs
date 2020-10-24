import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom"
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
import AppContext from "../state/context";
import EditProfile from "../pages/app/editProfile";
import Home from "../pages/app/home";
import Search from "../pages/app/search";
import Single from "../pages/app/single";
class Auth  extends Component{
    static contextType = AppContext
    componentDidMount(){
        const path = this.props.location.pathname;
        const search = this.props.location.search
        if (path.includes('app')) {
            this.props.history.push(path+search)
        }
        else {
            this.props.history.push('/app/dashboard')
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname || this.context.state.dashboard){
            if(this.context.state.dashboard){
                if(prevProps.location.pathname.includes('property'))
                this.props.history.push('/app/inbox')
                else if(prevProps.location.pathname.includes('reviews')|| prevProps.location.pathname.includes('payments'))
                this.props.history.push('/app/profile')
            }
        }
    }
    componentWillUnmount(){
        window.localStorage.setItem('path', this.props.location.pathname)
    }

    render(){
    return (
        <Switch>
            <Route path='/app/dashboard' >
                <Dashboard />
            </Route>
            <Route path='/app/property' >
                <Properties />
            </Route>
            <Route path='/app/add-property' >
                <AddProperty />
            </Route>
            <Route path='/app/edit-property' >
                <EditProperty />
            </Route>
            <Route path='/app/payments' >
                <DashboardPayment />
            </Route>
            <Route path='/app/search' >
                <Search />
            </Route>
            <Route path='/app/crib' >
                <Single />
            </Route>
            <Route path="/app/reviews">
                <Review/>
            </Route>
            <Route path="/app/home">
                <Home/>
            </Route>

            <Route path='/app/settings' >
                <Setting />
            </Route>

            <Route path='/app/profile' >
                <Profile/>
            </Route>
            <Route path='/app/edit-profile' >
                <EditProfile/>
            </Route>
            <Route path='/app/inbox' >
                <Inbox />
            </Route>
 
            <Route path='/app/calendar'>
                <DashboardCalendar />
            </Route>

        </Switch>
    )
}
}
export default withRouter(Auth);