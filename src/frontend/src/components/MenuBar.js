import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';
import Login from './login';
import { useSelector } from 'react-redux';

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
        flex: "auto",
    }
});
/**
 * If I hade more time,
 * I would make this a lot nicer but for now, it's good enough
 * 
 * As well not sure why the first time you navigate to a new tab..
 * it does as page refresh?
 * 
 * May be because of the fact we are lazy loading our components
 * Unsure
 * Regardless, I don't care right now
 */
function MenuBar(props) {
    const signedIn = useSelector(state => state.signedIn);
    const onSignInPage = useSelector(state => state.onSignInPage);
    const classes = useStyles();
    const {handleLogIn, handleSignOut} = props;
    const [value, setValue ] = useState(0);

    const handleChange = (event, index) => {
        props.history.push(`${event.currentTarget.getAttribute("to")}`);
        setValue(index);
    }

    return (
        <AppBar color="default" position="static">
            <Grid
                container    
            >
            <Grid item>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                <Tab
                    value={0}
                    label={"Character Creation"}
                    to={"/character"}
                />
                <Tab
                    value={1}
                    label={"Manage Party"}
                    to={"/party"}
                />
                { signedIn && (
                    <Tab
                        value={2}
                        label={"View Characters"}
                        to={"/user/characters/view"}
                    />
                )}
            </Tabs>
            </Grid>
            { !onSignInPage && 
                <Grid
                    container
                    item
                    direction="row"
                    xs={3}
                    justify="flex-end"
                >
                    <Grid item>
                    <Login classes={classes} handleLogIn={handleLogIn} handleSignOut={handleSignOut}/>
                    </Grid>
                </Grid>
            }
            </Grid>
        </AppBar>
    )
}


MenuBar.propTypes = {
    handleLogIn: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired,
}


export default withRouter(MenuBar);
