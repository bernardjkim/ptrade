import React, { Component } from 'react';
import routes from './routes';
import { BrowserRouter, Route, Redirect, Switch, } from 'react-router-dom';

class Router extends Component {
    render() {
        const routeComponents = routes.map(({ path, component, exact }, key) =>
            <Route
                path={path}
                component={component}
                exact={exact}
                key={key}
            />
        );

        return (
            <BrowserRouter>
                <Switch>
                    {routeComponents}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;