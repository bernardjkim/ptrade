/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import { makeSelectToken } from 'containers/App/selectors';
import { loadToken } from 'containers/App/actions';
import { SigninLink } from 'components/Links/index';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { changeInput, createUser } from './actions';
import makeSelectSignupPage from './selectors';
import StyledContainer from './components/StyledContainer';
import StyledForm from './components/StyledForm';
import StyledPaper from './components/StyledPaper';
import StyledTextField from './components/StyledTextField';
import StyledButton from './components/StyledButton';

/* eslint-disable react/prefer-stateless-function */
export class SignupPage extends React.PureComponent {
  componentWillMount() {
    // check if token is already stored in storage
    if (!this.props.token) {
      this.props.getToken();
    }
  }

  render() {
    const {
      handleSubmit,
      handleChangeInput,
      showMissing,
      username,
      email,
      password,
      token,
    } = this.props;

    // Redirect to dashboard if already authenticated
    if (token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <StyledContainer>
        <StyledPaper>
          <Typography variant="headline" component="h3" align="center">
            Sign up
          </Typography>
          <StyledForm noValidate autoComplete="off" onSubmit={handleSubmit}>
            <StyledTextField
              id="username"
              label="Username"
              margin="normal"
              onChange={e => handleChangeInput('username', e.target.value)}
              error={showMissing ? username.length < 1 : false}
              autoFocus
            />
            <StyledTextField
              id="email"
              label="Email"
              margin="normal"
              onChange={e => handleChangeInput('email', e.target.value)}
              error={showMissing ? email.length < 1 : false}
            />
            <StyledTextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={e => handleChangeInput('password', e.target.value)}
              error={showMissing ? password.length < 1 : false}
            />
            <StyledButton
              size="small"
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </StyledButton>
            <StyledButton size="small" color="primary" component={SigninLink}>
              Sign in
            </StyledButton>
          </StyledForm>
        </StyledPaper>
      </StyledContainer>
    );
  }
}

SignupPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  showMissing: PropTypes.bool,
  username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  signupPage: makeSelectSignupPage(),
  token: makeSelectToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleChangeInput: (field, value) => {
      dispatch(changeInput(field, value));
    },
    handleSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createUser());
    },
    getToken: () => {
      dispatch(loadToken());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupPage', reducer });
const withSaga = injectSaga({ key: 'signupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupPage);
