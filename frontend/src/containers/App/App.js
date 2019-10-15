import React, { Component, Suspense, lazy } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import client from '../../feather/feathers'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';


// Use lazy loading here
const Menu = lazy(() => import('../../components/MenuBar'));
const CharacterCreation = lazy(() => import('../../pages/CharacterCreation'));
const Party = lazy(() => import('../../pages/Party'));
const ViewCharacters = lazy(() => import('../../pages/ViewCharacters'));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      user: {}
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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

  handleSignIn = () => {
    client.authenticate().then(auth => {
      this.setState({
        signedIn: true,
        user: auth.user,
      })
    });
  }

  handleSignOut = () => {
    client.logout().then(() => {
      this.setState({
        signedIn: false,
        user: {}
      })
    });
  }

  render() {
    const { signedIn, user } = this.state;
    return (
      <Router>
      <div className="App">
        <Suspense fallback={<CircularProgress/>}>
            <Menu handleSignIn={this.handleSignIn} handleSignOut={this.handleSignOut} signedIn={signedIn} user ={user} />
            <ul>
              <Switch>
                <Route path="/party">
                  <Party signedIn={signedIn} user={user}/>
                </Route>
                <Route path="/character">
                  <CharacterCreation signedIn={signedIn} user={user} />
                </Route>
                <Route path="/user/characters/view">
                  <ViewCharacters signedIn={signedIn} user={user} />
                </Route>
                <Route path="/">
                  If you were trying to view a page that is not this page, it probably doesn't exist
                  <CharacterCreation signedIn={signedIn} user={user}/>
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
