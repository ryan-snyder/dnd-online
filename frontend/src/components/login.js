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
    }
    handleSignIn() {
        console.log('You tried to sign in with the following values');
        console.log(this.state.email);
        console.log(this.state.password);
        client.authenticate({
            strategy: 'local',
            email: this.state.email,
            password: this.state.password
        }).then(() => {
            console.log('User is signed in');
            // Do something here to pass this state up
        }).catch(e => {
            console.log('You were not signed in');
            console.log(e);
        })

    }
    renderForm() {
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
            >
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
                <Button color="primary" onClick={this.handleSignIn}>Submit</Button>
            </Grid>
        )
    }

    // render the login header
    // this will take the signedIn and the user props
    // and determine what to do
    render() {
        const { signedIn, user } = this.props;
        // Make a form that will prompt them to sign up or whatever
        // We should hook this up to redux and then dispatch the action to change the signin state

        return (
            <span>
                {signedIn ? (`Hello ${user.email}`) : this.renderForm()}
            </span>
        )
    }
}

Login.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default Login;