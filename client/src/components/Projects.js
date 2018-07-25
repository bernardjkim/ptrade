import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

class Projects extends Component {
  renderProjectItem(project) {
    return (
      <ProjectItem
        key={project.id}
        project={project}
        onDelete={() => this.props.deleteProject(project.id)}
      />

    );
  }

  render() {
    let projectItems;
    if (this.props.projects) {
      projectItems = this.props.projects.map(project => this.renderProjectItem(project));
    }
    return (
      <div className="Projects">
        My Projects
        {projectItems}
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array,
  deleteProject: PropTypes.func,
}

export default Projects;
