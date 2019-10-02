import React, { Component } from 'react';
import client from '../../feather/feathers'
import logo from './logo.svg';
import './App.css';


// Use lazy loading here
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    client.on('connected', data => console.log('event happened', data))
    //if the user is already signed in this will succeed
    client.authenticate().then(user => {
      this.setState({
        signedIn: true,
        user
      });
    }).catch({
      signedIn: null
    });

    client.emit('connected', {
      message: 'User connected'
    });
  }
  // Use react router to point to pages
  // Sign-in/Sign-up will be a component in the header
  // We will pass down signedIn and user to the login component
  // Once I'm not dumb
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
