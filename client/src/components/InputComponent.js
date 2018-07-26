import React, { Component } from 'react';
import { ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class InputComponent extends Component {

    getValidationState(value) {
        const length = value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    render() {

        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.getValidationState(this.props.value)}
            >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    type={this.props.type}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>{this.props.help}</HelpBlock>
            </FormGroup>

        );
    }
}

export default InputComponent;