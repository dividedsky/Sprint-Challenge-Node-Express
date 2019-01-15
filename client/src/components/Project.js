import React from 'react';

class Project extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProjectActions(id);
    this.props.getProjectDetails(id);
  }

  render() {
    console.log(`render props: ${this.props}`);
    if (!this.props.details) return <h3>loading</h3>;
    return (
      <div>
        <h3>{this.props.details.name}</h3>
        {this.props.actions.map(a => (
          <p key={a.id}>{a.description}</p>
        ))}
      </div>
    );
  }
}

export default Project;
