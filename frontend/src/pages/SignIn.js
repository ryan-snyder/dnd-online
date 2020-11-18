import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import client from '../feather/feathers';
import { useForm } from "react-hook-form";


function SignIn(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => client.service('users').create(data).then(() => {
        console.log('created user');
        console.log('signing in');
    })
    return (
        
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
                <Grid
                container
                direction="row"
                spacing={2}
                justify="center"
                > 
                <Grid item>
                <FormControl margin="dense">
                    <TextField
                        id="email"
                        inputRef={register({required: true})}
                        label="email"
                        name="email"
                    />

                </FormControl>
                </Grid>
                <Grid item>
                <FormControl margin="dense">
                    <TextField
                        id="password"
                        inputRef={register({required: true})}
                        label="password"
                        name="password"
                        type="password"
                    />
                </FormControl>
                </Grid>
                </Grid>
        <input type="submit" />
      </form>
    )
}


export default SignIn;