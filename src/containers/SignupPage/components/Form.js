import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { SigninLink } from 'containers/SigninPage/SigninPage';

const styles = theme => ({
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

const Form = ({ classes, handleChange, handleSubmit, form, showMissing }) => (
    <Paper className={classes.paper} elevation={1}>
        <Typography variant="headline" component="h3" align="center">
            Create a new account!
                </Typography>
        <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <TextField
                    id="first"
                    label="First Name"
                    className={classes.textField}
                    onChange={handleChange('first')}
                    margin="normal"
                    autoFocus
                    required
                    error={showMissing ? form['first'].length < 1 : false}
                />
                <TextField
                    id="last"
                    label="Last Name"
                    className={classes.textField}
                    onChange={handleChange('last')}
                    margin="normal"
                    required
                    error={showMissing ? form['last'].length < 1 : false}
                />
            </div>
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                onChange={handleChange('email')}
                margin="normal"
                required
                error={showMissing ? form['email'].length < 1 : false}
            />
            <div>
                <TextField
                    id="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    onChange={handleChange('password')}
                    margin="normal"
                    required
                    error={showMissing ? form['password'].length < 1 : false}
                />
                <TextField
                    id="passwordConfirm"
                    label="Confirm Password"
                    className={classes.textField}
                    type="password"
                    onChange={handleChange('passwordConfirm')}
                    margin="normal"
                    required
                    error={showMissing ? form['passwordConfirm'].length < 1 : false}
                />
            </div>
            <div className={classes.buttonContainer}>
                <Button size="small" color="primary" className={classes.button} component={SigninLink}>
                    Already have an account?
                </Button>
                <Button size="small" variant="contained" color="primary" className={classes.button} type="submit">
                    Create Account
                </Button>
            </div>
        </form>
    </Paper>
)

Form.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Form);