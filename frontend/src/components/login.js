import React, { Component } from 'react';


class Login extends Component {

    constructor(props) {
        super(props);


    }

    // render the login header
    // this will take the signedIn and the user props
    // and determine what to do
    render() {
        const {signedIn, user } = this.props;
        // why am i Dumb. 
        // can't remember how to use jsx ffs
        // Going to come back to this
        // The gist of it is that if we're signed in say Hello whatever and eventually display a button
        // If we aren't signed in show the login and the signup prompt
        return (
            <span>
                {signedIn && (
                    `Hello ${user.email}`
                )}
            </span>
        )
    }
}