import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
class Login extends Component {

    constructor(props) {
        super(props);
        this.renderForm = renderForm;
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSignIn = () => {
        console.log('You tried to sign in with the following values');
        console.log(this.state.email);
        console.log(this.state.password);
    }
    renderForm() {
        return (
            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input>
                    id="email"
                    value={this.state.email}
                    onChange={event => this.setState({
                        ...this.state,
                        email: event.target.value
                    })}
                </Input>
                <InputLabel>Password</InputLabel>
                <Input>
                    id="password"
                    value={this.state.password}
                    onChange={event => this.setState({
                        ...this.state,
                        password: event.target.value
                    })}
                </Input>
                <Button color="primary" onClick={this.handleSignIn()} />
            </FormControl>
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