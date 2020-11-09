import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../state/context';
import { getDashboard } from '../helpers/helpers';

const PublicRoute = ({component: Component, ...rest}) => {
    const {state} = useContext(AppContext)
    const dash = getDashboard()
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            props.location.state && Boolean(state.userData) ?
            props.location.state.referer !== undefined&&
                <Redirect to={props.location.state.referer} exact />
            :
            state.user?
            !state.user.emailVerified?
            <Redirect to="/verification" />
                : 
                dash?
                <Redirect to="/app/home" />
                :
                <Redirect to="/app/dashboard" />
            :
            <Component {...props} />
            )} />
    );
};

export default PublicRoute;