import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import './App.css';

import routes from './containers/index';

class App extends Component {
    render() {
        const routeComponents = routes.map(({ path, component, exact }, key) => {
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
                <Switch>
                    {routeComponents}
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;