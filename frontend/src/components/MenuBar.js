import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import Login from './login';
import NavTab from './NavTab';

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
/**
 * TODO:
 * 
 * Change this to Tabs
 * Make React router tab component
 * Make dropdown menu for login and such
 * 
 * 
 *             <Grid
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
 */
function MenuBar(props) {
    const classes = useStyles();
    const { signedIn, user, handleSignIn, handleSignOut } = props;
    const [value, setValue ] = React.useState(0);


    const handleChange = (event, index) => {
        console.log("Handling change");
        setValue(index);
    }

    return (
        <AppBar color="default" position="static">
            <Tabs
                value={value}
                onChange={handleChange}
            >
                <Tab
                    value={0}
                    label={"Character Creation"}
                    to={"/character"}
                    component={NavTab}
                />
                <Tab
                    value={1}
                    label={"Manager Party"}
                    to={"/party"}
                    component={NavTab}
                />
            </Tabs>
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