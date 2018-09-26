import React from 'react';
import PropTypes from 'prop-types';

import { fade } from '@material-ui/core/styles/colorManipulator';
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
        color: 'white',
        backgroundColor: '#90A4AE',
        '&:hover': {
            backgroundColor: fade('#90A4AE', 0.60),
        },
    },
    containerInput: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        textAlign: 'right',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    inputQty: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#EDE7F6', .15),
        '&:hover': {
            backgroundColor: fade('#EDE7F6', 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '30%',
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

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleTrade();
        this.handleClose();
    }

    render() {
        const { classes, title, symbol, pps, disabled, handleChange } = this.props;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    size="large"
                    variant="contained"
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
                            {title} {symbol}
                        </Typography>
                        <br/>
                        <Typography variant="title" id="modal-title">
                            ${pps} per share
                        </Typography>
                        <br />
                        <div className={classes.containerInput}>
                            <Typography>Quantity</Typography>
                            <div className={classes.inputQty}>
                                <form onSubmit={this.handleSubmit}>
                                    <Input
                                        autoFocus
                                        onChange={handleChange}
                                        placeholder="0"
                                        disableUnderline
                                        type="number"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                    />
                                </form>
                            </div>
                        </div>
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
    title: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    pps: PropTypes.string.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(TradeModal);