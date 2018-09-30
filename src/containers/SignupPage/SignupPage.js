import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import Form from './components/Form';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
});

// Link to signup page
export const SignupLink = props => <Link style={{ textDecoration: 'none' }} to="/signup" {...props} />

const SignupPage = ({ classes, handleChange, handleSubmit, form, showMissing }) => (
    <div className={classes.container}>
        <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            showMissing={showMissing}
        />
    </div>
);
SignupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    showMissing: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SignupPage);