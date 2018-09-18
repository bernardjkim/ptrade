import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { SignupLink } from 'containers/SignupPage/SignupPage';

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    textFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const Form = ({ classes, handleChange, handleSubmit }) => (
    <Paper className={classes.paper} elevation={1}>
        <Avatar className={classes.avatar}>
            <LockIcon />
        </Avatar>
        <Typography variant="headline" component="h3" align="center"> Sign in </Typography>
        <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                onChange={handleChange('email')}
                margin="normal"
            />
            <TextField
                id="password"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
                margin="normal"
            />
            <div className={classes.buttonContainer}>
                <Button size="small" color="primary" className={classes.button} component={SignupLink}>
                    Register
                </Button>
                <Button size="small" variant="contained" color="primary" className={classes.button} type="submit">
                    Sign In
                </Button>
            </div>
        </form>
    </Paper>
);

Form.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Form);