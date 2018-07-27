import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from './components/Router';
import './App.css';
import * as account from './actions/accountActions';

const mapStateToProps = state => ({
  account: state.account,
});

class App extends Component {

  componentWillMount() {
    this.props.dispatch(account.check())
  }

  render() {
    if (this.props.account.isAuthenticated === undefined) {
      return (
        <div>Loading...</div>
      )

    }
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
