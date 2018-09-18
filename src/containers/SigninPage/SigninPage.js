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


// Link to signin page
export const SigninLink = props => <Link to="/signin" {...props} />

const SigninPage = ({ classes, handleChange, handleSubmit, form, showMissing }) => (
    <div className={classes.container}>
        <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            showMissing={showMissing}
        />
    </div>
);
SigninPage.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(SigninPage);