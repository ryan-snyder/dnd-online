import React, {useState, useEffect, useContext }  from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Context } from '../Store/Store';
import { getAllCharacters, deleteCharacter } from '../api/index';



function ViewCharacters(props) {
    const [state] = useContext(Context);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        console.log(state);
        getAllCharacters().then(result => {
            console.log(result.data);
            setCharacters(result.data);
        }).catch((err) => {
            console.log(err);
            setCharacters([]);
        })
    }, [state])

    // ideally we move all this to a seperate file or something
    const handleDelete = (id) => {
        deleteCharacter(id).then(result => {
            console.log('Delete successful')
            // seperate function. maybe using global state? idk 
            getAllCharacters().then(result => {
                setCharacters(result.data);
            }).catch((err) => {
                console.log(err);
                setCharacters([]);
            })
        }).catch(err => {
            console.log(err);
        });
    }
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
