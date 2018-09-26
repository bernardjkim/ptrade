import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
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
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class TradeModal extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, title, symbol, disabled, handleChange, handleTrade } = this.props;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={disabled}
                >
                    {title}
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            {title} {symbol} at {'<pps>'}
                        </Typography>
                        <br />
                        <form onSubmit={handleTrade}>
                            <Input
                                onChange={handleChange}
                                placeholder="Quantity"
                            />
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

TradeModal.propTypes = {
    classes: PropTypes.object.isRequired,
    handleTrade: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(TradeModal);