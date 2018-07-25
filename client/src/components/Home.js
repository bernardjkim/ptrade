import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: undefined, };
    }

    componentWillMount() {
        if (cookies.get("api.example.com")) {
            this.setState({ isAuthenticated: true, });
        }
    }

    onSignOut() {
        this.setState({ isAuthenticated: false});
        cookies.remove("api.example.com");
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <div>
                    <h3>HOME</h3>
                    <button onClick={() => this.onSignOut()}> Sign Out </button>

                </div>
            )
        } else {
            return (
                <div>
                    <h3>HOME</h3>
                    <button>
                        <Link to="/login">Sign In</Link>
                    </button>
                </div>

            );
        }
    }
}

export default Home;
