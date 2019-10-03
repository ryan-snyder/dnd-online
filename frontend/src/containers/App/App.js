import React, { Component, Suspense, lazy } from 'react';
import client from '../../feather/feathers'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import './App.css';


// Use lazy loading here
const Login = lazy(() => import('../../components/login'));
// TODO: Move this into pages
// And then lazy load them as well
function Character() {
  return <li> Character Creation/Viewer</li>
}

function Party() {
  return <li> Party Creation/Viewer</li>
}

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
    const { signedIn, user } = this.state;
    /**
     * TODO:
     * Add a Router Below the app bar
     * Add Character creation
     * Move AppBar and Login into a NavBar component
     * 
     */
    return (
      <Router>
      <div className="App">
        <Suspense fallback={<div> Loading... </div>}>
          <AppBar color="default" position="static">
            <Login signedIn={signedIn} user ={user} />
          </AppBar>
            <p>
              This will redirect the user to the appropriate page:
            </p>
            <ul>
              <Switch>
                <Route path="/party">
                  <Party />
                </Route>
                <Route path="/character">
                  <Character />
                </Route>
                <Route path="/">
                  <Character />
                </Route>
              </Switch>
            </ul> 
          </Suspense>
      </div>
      </Router>
    );
  }
}

export default App;
