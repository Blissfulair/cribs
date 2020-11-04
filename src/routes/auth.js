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
             Boolean(state.userData)?
             !dash?
                <Component {...props} />
                :
                <Redirect to="/app/home"  />
            : <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />
        )} />
    );
};

export default HostRoute;