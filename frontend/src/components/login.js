import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import client from '../feather/feathers';
import { Context } from '../Store/Store';

import { Link as RouterLink } from 'react-router-dom';


// seperate into multiple components????
// one for actual sign up page, and one for menubar
function Login(props) {
    const { handleLogIn, handleSignOut, classes } = props; 
    const [state,dispatch] = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = () => {
        const data = {
            email,
            password
        };
        handleLogIn(data);
    };
    const clearValueAndSignOut = () => {
        setEmail('');
        setPassword('');
        handleSignOut(); 
    };
    
    const renderLogin = () => {
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
                        className={classes.input}
                        id="email"
                        label="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                </FormControl>
                </Grid>
                <Grid item>
                <FormControl margin="dense">
                    <TextField
                        className={classes.input}
                        id="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange= {event => setPassword(event.target.value)}
                    />
                </FormControl>
                </Grid>
                </Grid>
                <Grid item>
                    <Button className={classes.button} size="small" color="primary" onClick={submitData}>Login</Button>
                    <Button className={classes.button} size="small" color="primary" component={RouterLink} to="/signin">Sign Up Here</Button>
                </Grid>
            </span>
        )
    }

    const renderLoggedIn = () => {
        const { user } = state; 
        return (
            <div>
                <Grid item>{user.email}</Grid>
                <Grid item><Button color="secondary" onClick={clearValueAndSignOut}> Sign Out</Button></Grid>
            </div>
        )
    }

    return (
            state.signedIn ? renderLoggedIn() : renderLogin()
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    handleLogIn: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired
}


export default Login;