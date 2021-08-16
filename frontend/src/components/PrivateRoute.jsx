import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

// If the user is authorized, return the appropriate component. Otherwise, take them to the login page.
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)