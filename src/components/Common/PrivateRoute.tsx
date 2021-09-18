import { Redirect, Route, RouteProps } from 'react-router';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
    // Check user logged
    // If yes, show route
    // Otherwise, redirect to login page
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) return <Redirect to="/login" />;

    return <Route {...props} />;
}
