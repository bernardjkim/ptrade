/**
 *
 * SigninPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import { SignupLink } from 'components/Links/index';
import { createSession, loadToken } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectSigninPage, {
  makeSelectEmail,
  makeSelectPassword,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import StyledContainer from './components/StyledContainer';
import StyledForm from './components/StyledForm';
import StyledPaper from './components/StyledPaper';
import StyledTextField from './components/StyledTextField';
import StyledButton from './components/StyledButton';
import { changeInput } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class SigninPage extends React.PureComponent {
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
            Sign in
          </Typography>
          <StyledForm
            noValidate
            autoComplete="off"
            onSubmit={e => handleSubmit(e, email, password)}
          >
            <StyledTextField
              id="email"
              label="Email"
              margin="normal"
              onChange={e => handleChangeInput('email', e.target.value)}
              error={showMissing ? email.length < 1 : false}
              autoFocus
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
              Sign In
            </StyledButton>
            <StyledButton size="small" color="primary" component={SignupLink}>
              Register
            </StyledButton>
          </StyledForm>
        </StyledPaper>
      </StyledContainer>
    );
  }
}

SigninPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  showMissing: PropTypes.bool,
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  signinPage: makeSelectSigninPage(),
  token: makeSelectToken(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleChangeInput: (field, value) => {
      dispatch(changeInput(field, value));
    },
    handleSubmit: (evt, email, password) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createSession(email, password));
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

const withReducer = injectReducer({ key: 'signinPage', reducer });
const withSaga = injectSaga({ key: 'signinPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SigninPage);
