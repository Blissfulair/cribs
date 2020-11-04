import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../state/context';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {state} = useContext(AppContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
             Boolean(state.userData)?
                <Component {...props} />
            : <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )} />
    );
};

export default PrivateRoute;