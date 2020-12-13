import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


function ViewCharacters(props) {
    const user = useSelector(state => state.userState.user);
    const signedIn = useSelector(state => state.userState.signedIn);
    const dispatch = useDispatch();
    const characters = useSelector(state => state.characters);

    useEffect(() => {
        console.log('Current list of characters is...');
        console.log(characters);
        
    }, [characters]);
    // ideally we move all this to a seperate file or something
    const handleDelete = (id) => {
        console.log("Deleting charcters");
        dispatch({
            type: 'DELETE_CHARACTER',
            payload: {
                id
            }
        })
    }
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
                            <ListItem button component={Link} divider key={index} to={`/character/${character._id}`}>
                                <ListItemText
                                    primary={character.character.description.name}
                                    secondary={`Class: ${character.character.class.name} Race: ${character.character.race.name} Level: ${character.character.level}`}
                                />
                                <ListItemSecondaryAction>
                                <IconButton onClick={() => handleDelete(character._id) } edge="end">
                                            <DeleteIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                    )
            })}
            </List>
            }
        </span>
    )
}

export default ViewCharacters;
