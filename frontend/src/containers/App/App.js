import React, { Suspense, lazy, useEffect, useContext} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import client from '../../feather/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context } from '../../Store/Store';
import './App.css';


// Use lazy loading here
const Menu = lazy(() => import('../../components/MenuBar'));
const CharacterCreation = lazy(() => import('../../pages/CharacterCreation'));
const Party = lazy(() => import('../../pages/Party'));
const ViewCharacters = lazy(() => import('../../pages/ViewCharacters'));
const CharacterEdit = lazy(() => import('../../pages/CharacterEdit'));
const JoinParty = lazy(() => import('../../pages/JoinParty'));
const SignIn = lazy(() => import('../../pages/SignIn'));

const App = () => {
  const [dispatch] = useContext(Context);

  /**
   * When we sign in, we should make required api calls and pass into state
   * that way, we don't have to make multiple api calls on pages
   * on pages that need it, we will make more in-depth calls to get further data
   * So, on successful sign in state will be like so:
   * state: {
   * signedIn,
   * user: id,
   * characters: [
   *  ids
   * ],
   * parties: [
   *  ids
   * ]
   * }
   */
  useEffect(() => {
    client.on('connected', data => console.log('event happened', data))
    //if the user is already signed in this will succeed
    // If for some reason the user is deleted...
    // clear the auth token from the storage
    client.authenticate().then(auth => {
      console.log('Sign in successful');
      dispatch({
        type: 'SIGN_IN',
        payload: {
          signedIn: true,
          user: auth.user
        }
      });
    }).catch(() => {
      console.log('Sign in failed')
      dispatch({
        type: 'SIGN_IN',
        payload: {
          signedIn: false,
          user: {}
        }
      });
    });
    // question? Should we still "connect" even if we aren't a registered user?
    client.emit('connected', {
      message: 'User connected'
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const handleLogIn = (data) => {
    console.log(data);
    console.log('Logging In');
    const { email, password } = data;
    console.log(email);
    console.log(password);
    client.authenticate({
      strategy: 'local',
      email,
      password
    }).then(auth => {
        console.log('setting props');
        dispatch({
          type: 'SIGN_IN',
          payload: {
            signedIn: true,
            user: auth.user
          }
        });
        //gonna leave the "signIn" part out. Don't see why we need it
    }).catch(e => {
        console.log('You were not signed in');
        console.log(e);
    })
  }

  const handleSignOut = () => {
    client.logout().then(dispatch({
      type: 'SIGN_OUT'
    }));
  }

  return (
      <Router>
      <div className="App">
        <Suspense fallback={<CircularProgress/>}>
            <Menu handleLogIn={handleLogIn} handleSignOut={handleSignOut}/>
            <ul>
              <Switch>
                <Route exact path="/join/:invite">
                  {({ match }) => <JoinParty match={match}/> }
                </Route>
                <Route path="/party">
                  <Party />
                </Route>
                <Route exact path="/party/:id">
                </Route>
                <Route exact path="/character">
                  <CharacterCreation />
                </Route>
                <Route path="/character/:id">
                  {({ match }) => <CharacterEdit match={match} /> }
                </Route>
                <Route path="/user/characters/view">
                  <ViewCharacters />
                </Route>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route exact path="/">
                  <CharacterCreation />
                </Route>
                <Route>
                  404
                  The page you are looking for probably doesn't exist
                </Route>
              </Switch>
            </ul>
          </Suspense>
      </div>
      </Router>
  );

}


export default App;
