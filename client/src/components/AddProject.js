import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            newProject: {},
        }
    }
    static defaultProps = {
        categories: ['Web Design', 'Web Development', 'Mobile Development']

    }

    handleSubmit(e) {
        // TODO: are there other ways to reference these values
        if (this.refs.title.value === '') {
            alert('Title is required');
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value,
                }
            }, function () {
                this.props.addProject(this.state.newProject);
            });
        }
        e.preventDefault();
    }
    render() {
        let cateoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });
        return (
            <div>
                <h3>Add Project</h3>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="">Title</label>
                        <input type="" ref="title" />
                    </div>
                    <div>
                        <label htmlFor="">Category</label><br />
                        <select name="" id="" ref="category">
                            {cateoryOptions}
                        </select>

                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

AddProject.propTypes = {
    categories: PropTypes.array,
    addProject: PropTypes.func,
}

export default AddProject;