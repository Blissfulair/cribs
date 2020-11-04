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
import Payment from "../pages/app/payment";
import Favourites from "../pages/app/host/favourites";
import History from "../pages/app/renter/history";
class Auth  extends Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state={
            times:0
        }
    }
    componentDidMount(){
        const path = this.props.location.pathname;
        const search = this.props.location.search
        if (path.includes('app')) {
            if(this.context.state.dashboard)
                if(path.includes('inbox'))
                this.props.history.push('/app/history')
                else if(path.includes('profile'))
                this.props.history.push('/app/profile')
                else if(path.includes('setting'))
                this.props.history.push('/app/setting')
                else
                this.props.history.push(path+search)
            else
            this.props.history.push(path+search)
        }
        else {

           if(!this.context.state.dashboard)
            this.props.history.push(path+search)
        }
    }
    componentDidUpdate(prevProps){
        let dash = true
        if(prevProps.location.pathname !== this.props.location.pathname || this.context.state.dashboard){
            if(this.context.state.dashboard){
                if(prevProps.location.pathname.includes('property'))
                this.props.history.push('/app/inbox')
                else if(prevProps.location.pathname.includes('reviews')|| prevProps.location.pathname.includes('payments'))
                this.props.history.push('/app/profile')
                // else if(this.props.history.location.pathname.includes('calender') || this.props.history.location.pathname.includes('dashboard') || this.props.history.location.pathname.includes('withdraw') || this.props.history.location.pathname.includes('reviews'))
                // this.context.setDashboard(false)
                // else
                // this.context.setDashboard(true)
                // this.props.history.push(path+search)
                dash = this.context.state.dashboard
            }
        }
        else if(dash !== this.context.state.dashboard && this.state.times === 0){
            dash = this.context.state.dashboard
            const path = this.props.location.pathname;
            const search = this.props.location.search
            this.setState({times:1})
            if (path.includes('app')) {
                if(!this.context.state.dashboard)
                {
                    if(path.includes('profile'))
                    this.props.history.push('/app/profile')
                    else if(path.includes('settings'))
                    this.props.history.push('/app/settings')
                    else
                    this.props.history.push('/app/dashboard')
                }
                else
                this.props.history.push(path+search)
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
            <Route path='/app/withdraws' >
                <DashboardPayment />
            </Route>
            <Route path='/app/history' >
                <History />
            </Route>
            <Route path='/app/favourites' >
                <Favourites />
            </Route>
            <Route path='/app/search' >
                <Search />
            </Route>
            <Route path='/app/payment' >
                <Payment />
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