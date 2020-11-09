import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../state/context';
import { getDashboard } from '../helpers/helpers';

const HostRoute = ({component: Component, ...rest}) => {
    const {state} = useContext(AppContext)
    const dash = getDashboard()
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            // state.user && state.user.emailVerified?
            //  Boolean(state.userData)?
            Boolean(state.userData)&& !dash && state.user.emailVerified?
                <Component {...props} />
                :
                <Redirect to="/verification"  />
                // :
                // <Redirect to="/verification"  />
            // : <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />

            // :
            // <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )} />
    );
};

export default HostRoute;