import React, { Component } from 'react';
import client from '../../feather/feathers'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    state = {

    };
  }
  componentDidMount() {
    client.on('connected', data => console.log('event happened', data))

    client.authenticate().catch(() => this.setState({ login: null }));

    client.emit('connected', {
      message: 'User connected'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This will redirect the user to the appropriate page
          </p>
          <ul>
            <li> Character Creation/Viewer</li>
            <li> Party Creation/Viewer</li>
            <li> Login/Signup</li>   
          </ul> 
        </header>
      </div>
    );
  }
}

export default App;
