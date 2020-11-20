import React, {useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import client from '../feather/feathers';
import { Context } from '../Store/Store';




function JoinParty(props) {

    const [state] = useContext(Context);
    const [open, setOpen] = useState(false); 
    const [ characters, setCharacters ] = useState([]);
    const [ character, setCharacter ] = useState({
        name: ''
    });


    useEffect(() => {
        client.service('users').get(state.user._id).then(result => {
            console.log(result.characters);
            setCharacters(result.characters);
        }).catch((err) => {
            console.log(err);
            setCharacters([]);
        });
    }, [state]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setCharacter({
            name: ''
        });
        setOpen(false)
    };
    const handleChange = (event) => {
        console.log(event.currentTarget.getAttribute('id'));
        const character = characters.find(char => char.id === event.currentTarget.getAttribute('id'));
        setCharacter(character);
    }

    const renderCharacterSelection = () => {
        return (
            <DialogContent>
                <DialogContentText>
                    Select your character to use for this party
                </DialogContentText>
                <Select
                    value={character.name}
                    onChange={handleChange}
                    displayEmpty
                >
                <MenuItem value=''><em>Select a Character</em></MenuItem>
                {characters.length > 0 &&
                    characters.map((character, index) => <MenuItem key={index} id={character.id}  value={character.name}>{character.name}</MenuItem>)
                }
            </Select>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Join
                </Button>
            </DialogActions>
            </DialogContent>
        )
    };

    const renderSignIn = () => {
        return (
            <DialogContent>
                <DialogContentText>
                    Please login or signup to join this party
                </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Login
                </Button>
                <Button onClick={handleClose} color="primary">
                    SignUp
                </Button>
            </DialogActions>
            </DialogContent>
        )
    }
    return (
        <span>
            <p>Join Party</p>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Join Party
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Join Party</DialogTitle>
                { state.signedIn ? renderCharacterSelection() : renderSignIn()}
            </Dialog>
        </span>
    )
}


export default JoinParty;