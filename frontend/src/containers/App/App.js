import React, { Component } from 'react';
import client from '../../feather/feathers'
import logo from './logo.svg';
import Login from '../../components/login';
import './App.css';


// Use lazy loading here
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      user: {}
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
    }).catch(this.setState({
      signedIn: false,
      user: {}
    }));

    client.emit('connected', {
      message: 'User connected'
    });
  }
  render() {
    const { signedIn, user } = this.state;
    return (
      <div className="App">
        <Login signedIn={signedIn} user ={user} />
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
