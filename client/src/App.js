import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design',
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development',
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development',
        },
      ]
    });
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects })

  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    projects = projects.filter(project => project.id !== id);
    this.setState({projects: projects});
  }

  render() {
    return (
      <div className="App">
        MyApp

        <AddProject
          addProject={(newProject) => this.handleAddProject(newProject)}
        />
        <Projects
          deleteProject={(id) => this.handleDeleteProject(id)}
          projects={this.state.projects}
        />
      </div>
    );
  }
}

export default App;
