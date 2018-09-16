import React, {Component} from 'react';
// import {     Button,     ControlLabel,     Form,     FormGroup, FormControl,
//    HelpBlock } from 'react-bootstrap';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import {SignUpLink} from 'components/SignUpPage';
import {SignInLink} from 'components/SignInPage';

import * as account from 'redux-modules/actions/accountActions'

class FormComponent extends Component {
    render() {
        if(this.props.submitLabel === "Sign Up") {
            return <SignUpForm />
        } else {
            return <SignInForm />
        }
        
    }
}

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = {
            values: {
                email: '',
                password: ''
            }
        };
    }

    handleChange(e) {
        const values = this.state.values;
        values[e.target.id] = e.target.value;
        this.setState({values: values})
    }

    handleSignIn(e) {
        const {email, password} = this.state.values;
        this
            .props
            .dispatch(account.signIn({email, password}));
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSignIn}>
                    <h1>Login</h1>
                    <FormGroup>
                        <Input 
                            id="email"
                            type="text"
                            placeholder="Email" 
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            id="password"
                            type="password" 
                            placeholder="Password" 
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <Button className="w-100">Sign In</Button>
                </Form>
                <SignUpLink/>
            </div>
        );
    }
}

class SignUpForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit}>
                    <h1>Sign Up</h1>
                    <FormGroup>
                        <Input placeholder="First Name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="Last Name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="Password"/>
                    </FormGroup>
                    <Button className="w-100">Create Account</Button>
                </Form>
                <SignInLink />
            </div>
        );
    }
}

// class FormComponent extends Component {
//     render() {
//         const inputComponents = Object
//             .keys(this.props.inputList)
//             .map((item, key) => {
//                 const {label, type, value} = this.props.inputList[item];
//                 return (
//                 <InputComponent
//                     key={key}
//                     controlId={item}
//                     label={label}
//                     type={type}
//                     value={value}
//                     handleChange={this.props.handleChange}/>
//                 );
//             })
//             return (
//                 <div className="container">
//                     <Form horizontal onSubmit={this.props.handleSubmit}>
//                         {inputComponents}
//                         <FormGroup>
//                             <Button type="submit">{this.props.submitLabel}</Button>
//                         </FormGroup>
//                     </Form>
//                 </div>
//             );
//     }
// }
// class InputComponent extends Component {
//     getValidationState(value) {
//         const length = value.length;
//         if (length > 10) 
//             return 'success';
//         else if (length > 5) 
//             return 'warning';
//         else if (length > 0) 
//             return 'error';
//         return null;
//     }
//     render() {
//         return (
//             <FormGroup
//                 controlId={this.props.controlId}
//                 validationState={this.getValidationState(this.props.value)}>
//                 <ControlLabel>{this.props.label}</ControlLabel>
//                 <FormControl
//                     type={this.props.type}
//                     value={this.props.value}
//                     placeholder={this.props.placeholder}
//                     onChange={this.props.handleChange}/>
//                 <FormControl.Feedback/>
//                 <HelpBlock>{this.props.help}</HelpBlock>
//             </FormGroup>
//         );
//     }
// }

export default FormComponent;