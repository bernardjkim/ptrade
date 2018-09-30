import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import UserMenu from './UserMenu';
import { DashboardLink } from 'containers/Dashboard/Dashboard';

const styles = theme => ({
    root: {
        width: '100%',
    },
    bar: {
        boxShadow: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

class TopBar extends React.Component {
    render() {
        const { classes, signout, user } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit" className={classes.bar}>
                    <Toolbar>
                        <Typography
                            component={DashboardLink}
                            className={classes.title}
                            variant="title"
                            color="inherit"
                            noWrap
                        >
                            PTrade
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {user.isAuthenticated ?
                                <UserMenu signout={signout} />
                                :
                                null
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);