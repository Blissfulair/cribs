import React, {Component} from "react";
import {Route,Switch,withRouter} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
class Root extends Component{
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
        else if(Boolean(this.props.user) && path.includes('crib'))
        this.props.history.push(path+search)
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