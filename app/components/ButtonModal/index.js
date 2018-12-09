/**
 *
 * ButtonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';

import StyledButton from './StyledButton';
import StyledPaper from './StyledPaper';

/* eslint-disable react/prefer-stateless-function */
class ButtonModal extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { disabled, title, children } = this.props;
    return (
      <div>
        <StyledButton
          onClick={this.handleOpen}
          size="large"
          variant="contained"
          disabled={disabled || false}
        >
          {title}
        </StyledButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <StyledPaper>{children}</StyledPaper>
        </Modal>
      </div>
    );
  }
}

ButtonModal.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.array.isRequired,

  onRef: PropTypes.func.isRequired,
};

export default ButtonModal;
