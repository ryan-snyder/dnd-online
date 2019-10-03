import React, { Component } from 'react';
import client from '../../feather/feathers'
import logo from './logo.svg';
import Login from '../../components/login';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
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
    // If for some reason the user is deleted...
    // clear the auth token from the storage
    client.authenticate().then(auth => {
      console.log('Sign in successful');
      this.setState({
        signedIn: true,
        user: auth.user,
      });
    }).catch(() => {
      console.log('Sign in failed')
      this.setState({
        signedIn: false,
        user: {}
      })
    });

    client.emit('connected', {
      message: 'User connected'
    });
  }
  render() {
    console.log('State was updated?');
    const { signedIn, user } = this.state;
    console.log(signedIn);
    return (
      <div className="App">
        <AppBar color="default" position="static">
          <Login signedIn={signedIn} user ={user} />
        </AppBar>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This will redirect the user to the appropriate page:
          </p>
          <ul>
            <li> We need to implement router here</li>
            <li> As well we should make a sign up page</li>
            <li> Character Creation/Viewer</li>
            <li> Party Creation/Viewer</li>
            <li> Signup</li>   
          </ul> 
      </div>
    );
  }
}

export default App;
