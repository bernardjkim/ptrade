/**
 *
 * SigninPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import { createSession, loadToken } from 'containers/App/actions';
import { makeSelectToken } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSigninPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

// import Form from './components/Form';
import StyledContainer from './components/StyledContainer';
import StyledForm from './components/StyledForm';
import StyledPaper from './components/StyledPaper';
import StyledTextField from './components/StyledTextField';
import StyledButton from './components/StyledButton';
import { changeInput } from './actions';

// Link to signin page
export const SigninLink = props => (
  <Link style={{ textDecoration: 'none' }} to="/signin" {...props} />
);

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
          <StyledForm noValidate autoComplete="off" onSubmit={handleSubmit}>
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
            <StyledButton size="small" color="primary">
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
});

export function mapDispatchToProps(dispatch) {
  return {
    handleChangeInput: (field, value) => {
      dispatch(changeInput(field, value));
    },

    handleSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createSession());
    },
    getToken: () => {
      dispatch(loadToken());
    },
    dispatch,
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
