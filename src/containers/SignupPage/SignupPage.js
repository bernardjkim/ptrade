import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';

import Form from './components/Form'

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
});

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
};

export default withStyles(styles)(SignupPage);