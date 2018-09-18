import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});


const MyLink = props => <Link to="/signin" {...props} />


class SearchBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes, changeSearch, submitSearch } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        // const renderMenu = (
        //     <Menu
        //         anchorEl={anchorEl}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         open={isMenuOpen}
        //         onClose={this.handleMenuClose}
        //     >
        //         <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        //         <MenuItem onClick={this.handleClose}>My account</MenuItem>
        //     </Menu>
        // );

        // const renderMobileMenu = (
        //     <Menu
        //         anchorEl={mobileMoreAnchorEl}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         open={isMobileMenuOpen}
        //         onClose={this.handleMobileMenuClose}
        //     >
        //         <MenuItem>
        //             <IconButton color="inherit">
        //                 <Badge className={classes.margin} badgeContent={4} color="secondary">
        //                     <MailIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Messages</p>
        //         </MenuItem>
        //         <MenuItem>
        //             <IconButton color="inherit">
        //                 <Badge className={classes.margin} badgeContent={11} color="secondary">
        //                     <NotificationsIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Notifications</p>
        //         </MenuItem>
        //         <MenuItem onClick={this.handleProfileMenuOpen}>
        //             <IconButton color="inherit">
        //                 <AccountCircle />
        //             </IconButton>
        //             <p>Profile</p>
        //         </MenuItem>
        //     </Menu>
        // );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            PTrade
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <form onSubmit={submitSearch}>
                                <Input
                                    onChange={changeSearch}
                                    placeholder="Search…"
                                    disableUnderline
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </form>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button component={MyLink}>
                                <Typography variant="subheading">Sign in</Typography>
                            </Button>
                            {/* <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton> */}
                        </div>
                        {/* <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div> */}
                    </Toolbar>
                </AppBar>
                {/* {renderMenu}
                {renderMobileMenu} */}
            </div>
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
    submitSearch: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);