import React, { Component } from 'react';
import routes from '../system/routes';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Navigation from './Navigation';

class Router extends Component {

    render() {
        const routeComponents = routes.map(({ path, component, exact }, key) => {
            // const CustomTag = component;

            return (
                <Route
                    path={path}
                    component={component}
                    exact={exact}
                    key={key}
                />
            );
        });

        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        {routeComponents}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;