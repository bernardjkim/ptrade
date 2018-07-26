import React, { Component } from 'react';
import routes from './routes';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Navigation from '../components/Navigation';

class Router extends Component {

    render() {
        const routeComponents = routes.map(({ path, component, exact }, key) => {
            const CustomTag = component;

            return (
                <Route
                    path={path}
                    render={(props) =>
                        <CustomTag {...props}
                            isAuthenticated={this.props.isAuthenticated}
                            authenticate={this.props.authenticate}
                            firstName={this.props.firstName}
                            email={this.props.email}
                        />
                    }
                    exact={exact}
                    key={key}
                />
            );
        });

        return (
            <BrowserRouter>
                <div>
                    <Navigation
                        isAuthenticated={this.props.isAuthenticated}
                        authenticate={this.props.authenticate}
                        firstName={this.props.firstName}
                        email={this.props.email}
                    />
                    <Switch>
                        {routeComponents}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;