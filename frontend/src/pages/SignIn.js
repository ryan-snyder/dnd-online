import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import client from '../feather/client';
import { useForm } from "react-hook-form";
import { Context } from '../Store/Store';


function SignIn(props) {
    const [state, dispatch] = useContext(Context);
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState({});
    const history = useHistory();
    const onSubmit = data => client.service('users').create(data).then((user) => {
        setError({});
        console.log('created user');
        console.log('signing in');
        dispatch({
            type: 'SIGN_IN',
            payload: {
                signedIn: true,
                user
            }
        });
        history.push('/character');


    }).catch((e) => {
        setError({
            other: 'This user already exists. Please use a different email'
        });
    });

    useEffect(() => {
        dispatch({
            type: 'REGISTER',
            payload: true
        });
        return function cleanup() {
            dispatch({
                type: 'REGISTER',
                payload:false
            });
        }
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <Grid>
        { state.onSignInPage && 
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
            {errors.email && 
            <Grid>
                <p>An email is required</p>
            </Grid>
            }
            {errors.password && 
            <Grid>
                <p>A password is required</p>
            </Grid>
            }
            {error.other && 
            <Grid>
                <p>{error.other}</p>
            </Grid>
            }
            
        </form>
        }
        </Grid>
    )
}


export default SignIn;
