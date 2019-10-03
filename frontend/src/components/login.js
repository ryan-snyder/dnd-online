import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import client from '../feather/feathers';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {
        const { signedIn, user } = this.props;
        console.log(signedIn);
        console.log(user);
        this.setState({
            ...this.state,
            signedIn,
            user
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.signedIn !== prevProps.signedIn) {
            this.setState({
                ...prevState,
                signedIn: this.props.signedIn,
                user: this.props.user,
            })
        }
    }

    handleSignUp() {
        const { email, password } = this.state;
        console.log('Signing up');
        return client.service('users')
            .create({email, password})
            .then(() => {
                console.log('Success creating user');
                console.log('Calling sign in');
                this.handleSignIn()
            });
    }
    handleSignIn() {
        const {email, password } = this.state;
        console.log('You tried to sign in with the following values');
        console.log(email);
        console.log(password);
        return client.authenticate({
            strategy: 'local',
            email,
            password
        }).then(auth => {
            console.log('setting props');
            this.setState({
                ...this.state,
                signedIn: true,
                user: auth.user
            });
            // Do something here to pass this state up
        }).catch(e => {
            console.log('You were not signed in');
            console.log(e);
        })

    }

    handleSignOut() {
        console.log('Signing out...');
        client.logout().then(() => {
            this.setState({
                ...this.state,
                signedIn: false,
                user: {}
            });
        });
    }

    renderLogin() {
        return (
            <div>
                <FormControl variant="filled">
                    <FormLabel>Email</FormLabel>
                    <FilledInput
                        id="email"
                        value={this.state.email}
                        onChange={event => this.setState({
                            ...this.state,
                            email: event.target.value
                        })}
                    />
                </FormControl>
                <FormControl variant="filled">
                    <FormLabel>Password</FormLabel>
                    <FilledInput
                        id="password"
                        value={this.state.password}
                        onChange= {(event) => {
                            this.setState({
                                ...this.state,
                                password: event.target.value
                            })
                        }}
                    />
                </FormControl>
                <Button color="primary" onClick={this.handleSignIn}>Login</Button>
                <Button color="primary" onClick={this.handleSignUp}>Sign Up</Button>
            </div>
        )
    }

    renderLoggedIn() {
        const { user } = this.state
        return (
            <div>
                <Grid item>{`Hello ${user.email}. You are signed in!`}</Grid>
                <Grid item><Button color="secondary" onClick={this.handleSignOut}> Sign Out</Button></Grid>
            </div>
        )
    }

    // render the login header
    // this will take the signedIn and the user props
    // and determine what to do
    render() {
        // Make a form that will prompt them to sign up or whatever
        // We should hook this up to redux and then dispatch the action to change the signin state
        const { signedIn } = this.state;
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
            >
            <span>
                {signedIn ? this.renderLoggedIn() : this.renderLogin()}
            </span>
            </Grid>
        )
    }
}

Login.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default Login;