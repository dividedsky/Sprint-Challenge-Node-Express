import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Projects from './components/Projects';
import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://localhost:8000',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    ax.get('/projects')
      .then(res => {
        this.setState({projects: res.data});
      })
      .catch(err => console.log(`there was an error getting the data: ${err}`));
  }
  render() {
    return (
      <div className="App">
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
