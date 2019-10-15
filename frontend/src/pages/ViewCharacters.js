import React, {useState, useEffect }  from 'react';
import client from '../feather/feathers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';




function ViewCharacters(props) {
    const { signedIn, user } = props;
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        console.log(user.characters);
        setCharacters(user.characters || []);
    }, [user])
    /**
     * For this...do we want to change it back to the way we had it
     * where the user would have some basic info on a character such as name, race, whatever
     * or do we want to go fetch that info ourselves
     * I think at the very least we want to display the name?
     */
    return (
        <span>
            {signedIn ? <p>Welcome {user.email}</p> : <p> If you are not logged in and you're on this page, please sign in</p>}
            <p>View your characters</p>
            { characters.length === 0 ? <p> You don't have any characters</p> : 
            <List>
            {characters.map((character, index) => {
                    return (
                        <ListItem button divider key={index} >
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

ViewCharacters.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default ViewCharacters;