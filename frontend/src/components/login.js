import React, { Component } from 'react';


class Login extends Component {

    constructor(props) {
        super(props);
        this.renderForm = renderForm;

    }

    renderForm() {
        return (
            <form>
                
            </form>
        )
    }

    // render the login header
    // this will take the signedIn and the user props
    // and determine what to do
    render() {
        const {signedIn, user } = this.props;
        // Make a form that will prompt them to sign up or whatever
        // We should hook this up to redux and then dispatch the action to change the signin state

        return (
            <span>
                {signedIn ? (`Hello ${user.email}`) : this.renderForm()}
            </span>
        )
    }
}


export default Login;