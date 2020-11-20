import React, {useState, useEffect, useContext }  from 'react';
import client from '../feather/feathers';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { Context } from '../Store/Store';



function ViewCharacters(props) {
    const [state] = useContext(Context);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        console.log(state);
        client.service('users').get(state.user._id).then(result => {
            console.log(result.characters);
            setCharacters(result.characters);
        }).catch((err) => {
            console.log(err);
            setCharacters([]);
        })
    }, [state])
    /**
     * For this...do we want to change it back to the way we had it
     * where the user would have some basic info on a character such as name, race, whatever
     * or do we want to go fetch that info ourselves
     * I think at the very least we want to display the name?
     */
    return (
        <span>
            {state.signedIn ? <p>Welcome {state.user.email}</p> : <p> If you are not logged in and you're on this page, please sign in</p>}
            <p>View your characters</p>
            { characters.length === 0 ? <p> You don't have any characters</p> : 
            <List>
            {characters.map((character, index) => {
                    return (
                        <ListItem button component={Link} divider key={index} to={`/character/${character.id}`}>
                            <ListItemText
                                primary={character.name}
                                secondary={`Class: ${character.class} Race: ${character.race} Level: ${character.level}`}
                            />
                        </ListItem>
                    )  
            })}
            </List>
            }
        </span>
    )
}

export default ViewCharacters;