import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom"
import Dashboard from "../pages/app/dashboard";
import Properties from "../pages/app/properties";
import AddProperty from "../pages/app/addProperty";
import DashboardPayment from "../pages/app/DashboardPayment";
import DashboardCalendar from "../pages/app/DashboardCalendar";
const Auth = ({ history, location }) => {
    const path = location.pathname;
    useEffect(() => {

        if (path.includes('app')) {
            history.push(path)
        }
        else {
            history.push('/app/dashboard')
        }
    }, [history, path])
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
            <Route path='/app/payments' >
                <DashboardPayment />
            </Route>
            <Route path='/app/calendar'>
                <DashboardCalendar />
            </Route>

        </Switch>
    )
}
export default withRouter(Auth);