import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getDashboard } from '../helpers/helpers';

const HostRoute = ({component: Component, ...rest}) => {
    const dashboard = getDashboard()
    console.log(dashboard)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            // state.user && state.user.emailVerified?
            //  Boolean(state.userData)?
            Boolean(rest.user)?
                !dashboard && rest.user.emailVerify?
                <Component {...props} />
                :
                <Redirect to="/app/home"  />
                :
                <Redirect to="/"  />
                // :
                // <Redirect to="/verification"  />
            // : <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />

            // :
            // <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )} />
    );
};
const mapStateToProps=state=>({
    user:state.user,
    dashboard:state.dashboard
})
export default connect(mapStateToProps)(HostRoute);