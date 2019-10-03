import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Login from './login';

const useStyles = makeStyles({
    button: {
        margin: "7px"
    },
    input: {
        height: "30px",
        width: "auto"
    },
    root: {
        flex: "auto"
    },
    links: {
        backgroundColor: "gray",
        flex: "auto"
    }
});

function MenuBar(props) {
    const classes = useStyles();
    const { signedIn, user, handleSignIn, handleSignOut } = props;
    return (
        <AppBar color="default" position="static">
            <Grid
                container
                spacing={1}
                direction="row"
                justify="space-between"
                alignItems="stretch"
            >
            <Grid
                container
                item
                direction="row"
                justify="space-evenly"
                alignItems="stretch"
                xs={2}
            >
                <Grid item xs className={classes.links}>
                    <Link to="/character">Character Creation </Link>
                </Grid>
                <Grid item xs className={classes.links}>
                    <Link to="/party">Manage Parties</Link> 
                </Grid>
            </Grid>
            <Grid
                container
                item
                direction="row"
                xs={3}
                justify="flex-end"
            >
                <Grid item>
                <Login classes={classes} handleSignIn={handleSignIn} handleSignOut={handleSignOut} signedIn={signedIn} user ={user} />
                </Grid>
            </Grid>
            </Grid>
        </AppBar>
    )
}


MenuBar.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired
}


export default MenuBar;