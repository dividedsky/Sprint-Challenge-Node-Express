import React, {Component} from 'react';
import './App.css';
import Projects from './components/Projects';
import Project from './components/Project';
import axios from 'axios';
import {Route, withRouter} from 'react-router-dom';

const ax = axios.create({
  baseURL: 'http://localhost:8000',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      projectActions: [],
      projectDetails: [],
    };
  }

  componentDidMount() {
    ax.get('/projects')
      .then(res => {
        this.setState({projects: res.data});
      })
      .catch(err => console.log(`there was an error getting the data: ${err}`));
  }

  getProjectActions = id => {
    ax.get(`/projects/${id}/actions`)
      .then(res => {
        this.setState({projectActions: res.data});
      })
      .catch(err => {
        console.log(`there was an error fetching the actions: ${err}`);
      });
  };

  getProjectDetails = id => {
    ax.get(`/projects/${id}`)
      .then(res => {
        this.setState({projectDetails: res.data});
      })
      .catch(err => {
        console.log(`there was an error fetching the project details: ${err}`);
      });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <Projects {...props} projects={this.state.projects} />
          )}
        />
        <Route
          path="/:id"
          render={props => (
            <Project
              {...props}
              actions={this.state.projectActions}
              getProjectActions={this.getProjectActions}
              getProjectDetails={this.getProjectDetails}
              details={this.state.projectDetails}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
