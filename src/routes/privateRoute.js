import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

const RentRoute = ({component: Component,history, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (


                // state.user && state.user.emailVerified?
                rest.emailVerify?
                <Component {...props} />
                // :

                // <Redirect to='/app/dashboard' />
                :
                props.location.pathname.includes('payment')?
                    <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
                :
                props.location.pathname.includes('app')?
                <Redirect to='/verification' />
                :
                <Redirect to="/"/>

            // :
            //  <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
            
        )} />
    );
};
const mapStateToProps=state=>({
    ...state
})
export default connect(mapStateToProps)(withRouter(RentRoute));