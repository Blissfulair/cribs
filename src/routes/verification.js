import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//import { getDashboard } from '../helpers/helpers';

const VerifyRoute = ({component: Component,history, ...rest}) => {
    // const {state} = useContext(AppContext)
    // const dash = getDashboard()
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
                rest.user?
                <Component {...props} />
                    :
                <Redirect to="/register" />
            //     dash?
            //         <Redirect to='/app/home' />
            //         :
            //         <Redirect to='/app/dashboard' />
                
            // // :
            // // <Redirect to='/app/dashboard' />
            // :
            // <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
            
        )} />
    );
};

const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(VerifyRoute);