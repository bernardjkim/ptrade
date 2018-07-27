import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';


class FormComponent extends Component {
    render() {
        const inputComponents = Object.keys(this.props.inputList).map((item, key) => {
            const { label, type, value } = this.props.inputList[item];
            return (
                <InputComponent
                    key={key}
                    controlId={item}
                    label={label}
                    type={type}
                    value={value}
                    handleChange={this.props.handleChange}
                />
            );
        })

        return (
            <Form horizontal onSubmit={this.props.handleSubmit}>
                {inputComponents}
                <FormGroup>
                    <Button type="submit">{this.props.submitLabel}</Button>
                </FormGroup>
            </Form>
        );
    }
}

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

export default FormComponent;