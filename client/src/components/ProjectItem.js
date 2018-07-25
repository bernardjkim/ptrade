import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';

class ProjectItem extends Component {
    testFunc() {

       let email = 'john@mail.com'; 
       let password = 'TEST'; 

        var authOptions = {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: qs.stringify({ email, password }),
        };

        axios(authOptions)
        .then(function(response) {
            console.log("test" + response);
        });
    }
    render() {
        return (
            <li className="Project">
                {/* <a onClick={() => this.props.onDelete()}>X</a> */}
                <a onClick={() => this.testFunc()}>X</a>
                <strong> {this.props.project.title}</strong>: {this.props.project.category}
            </li>
        )
    }
}

ProjectItem.propTypes = {
    project: PropTypes.object,
    onDelete: PropTypes.func,
}
export default ProjectItem;