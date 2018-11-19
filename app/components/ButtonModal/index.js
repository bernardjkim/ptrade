/**
 *
 * ButtonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import StyledButton from './StyledButton';
import StyledInput from './StyledInput';
import StyledPaper from './StyledPaper';
import ContainerInput from './ContainerInput';
import InputQuantity from './InputQuantity';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

/* eslint-disable react/prefer-stateless-function */
class ButtonModal extends React.Component {
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
    this.props.handleSubmit();
    this.handleClose();
  };

  render() {
    const { disabled, title, symbol, pps } = this.props;
    const { handleChange } = this.props;
    return (
      <div>
        <StyledButton
          onClick={this.handleOpen}
          size="large"
          variant="contained"
          disabled={disabled}
        >
          {title}
        </StyledButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <StyledPaper style={getModalStyle()}>
            <Typography variant="title" id="modal-title">
              {title} {symbol}
            </Typography>
            <br />
            <Typography variant="title" id="modal-title">
              ${pps} per share
            </Typography>
            <br />
            <ContainerInput>
              <Typography>Quantity</Typography>
              <InputQuantity>
                <form onSubmit={this.handleSubmit}>
                  <StyledInput
                    autoFocus
                    onChange={handleChange}
                    placeholder="0"
                    disableUnderline
                    type="number"
                  />
                </form>
              </InputQuantity>
            </ContainerInput>
          </StyledPaper>
        </Modal>
      </div>
    );
  }
}

ButtonModal.propTypes = {
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  symbol: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  pps: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),

  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ButtonModal;
