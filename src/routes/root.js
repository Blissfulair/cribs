import React, {Component} from "react";
import {Route,Switch,withRouter} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import AppContext from "../state/context";
class Root extends Component{
    static contextType = AppContext
    componentDidMount(){
        const path = this.props.location.pathname;
        const search = this.props.location.search
        if(!path.includes('app')&&this.props.user === null){
            if(path)
            this.props.history.push(path+search)
            else
            this.props.history.push('/')

        }
        else if(this.props.user === null)
        this.props.history.push('/')
        else if(Boolean(this.props.user))
        {
            if(path.includes('crib'))
            this.props.history.push(path+search)
            else
            {
                if(this.context.state.dashboard)
                this.props.history.push('/app/home')
                else
                this.props.history.push('/app/dashboard')
            }
            
        }
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            const path = this.props.location.pathname;
            const search = this.props.location.search
            if(!path.includes('app')&&this.props.user === null){
                if(path)
                this.props.history.push(path+search)
                else
                this.props.history.push('/')
    
            }
            else if(this.props.user === null)
            this.props.history.push('/')
            else if(Boolean(this.props.user) && path.includes('crib'))
            this.props.history.push(path+search)
        }
    }
    render(){
    return(
        <Switch>
            <Route path='/payment' >
                <Payment/>
            </Route>
            <Route path='/register' >
                <SignUp/>
            </Route>
            <Route path="/search">
                <Search/>
            </Route>
            <Route path="/crib/:id">
                <Single/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/">
                <Index/>
            </Route>
            
        </Switch>
    )
}
}
export default withRouter(Root);