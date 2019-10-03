import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.clearValueAndSignOut = this.clearValueAndSignOut.bind(this);
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
                this.handleLogIn()
            });
    }

    handleLogIn() {
        const {email, password } = this.state;
        const { handleSignIn } = this.props;
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
            handleSignIn();
        }).catch(e => {
            console.log('You were not signed in');
            console.log(e);
        })

    }
    clearValueAndSignOut() {
        this.setState({
            email: '',
            password: ''
        });
        this.props.handleSignOut();
    }
    renderLogin() {
        return (
            <span>
                <Grid
                container
                direction="row"
                spacing={2}
                justify="center"
                > 
                <Grid item>
                <FormControl margin="dense">
                    <TextField
                        className={this.props.classes.input}
                        id="email"
                        label="email"
                        value={this.state.email}
                        onChange={event => this.setState({
                            ...this.state,
                            email: event.target.value
                        })}
                    />

                </FormControl>
                </Grid>
                <Grid item>
                <FormControl margin="dense">
                    <TextField
                        className={this.props.classes.input}
                        id="password"
                        label="password"
                        type="password"
                        value={this.state.password}
                        onChange= {(event) => {
                            this.setState({
                                ...this.state,
                                password: event.target.value
                            })
                        }}
                    />
                </FormControl>
                </Grid>
                </Grid>
                <Grid item>
                    <Button className={this.props.classes.button} size="small" color="primary" onClick={this.handleLogIn}>Login</Button>
                    <Button className={this.props.classes.button} size="small" color="primary" onClick={this.handleSignUp}>Sign Up</Button>
                </Grid>
            </span>
        )
    }

    renderLoggedIn() {
        const { user } = this.state
        return (
            <div>
                <Grid item>{user.email}</Grid>
                <Grid item><Button color="secondary" onClick={this.clearValueAndSignOut}> Sign Out</Button></Grid>
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
            signedIn ? this.renderLoggedIn() : this.renderLogin()
        )
    }
}

Login.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired
}


export default Login;