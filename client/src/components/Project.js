import React from 'react';

class Project extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProjectActions(id);
  }

  render() {
    return (
      <div>
        <h3>Project Details</h3>
        {this.props.actions.map(a => (
          <p key={a.id}>{a.description}</p>
        ))}
      </div>
    );
  }
}

export default Project;
