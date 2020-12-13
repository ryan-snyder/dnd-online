import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import client from '../feather/client';
import { useSelector } from 'react-redux';



//TODO: Change this to match new patttern with sagas and redux stuff
function JoinParty(props) {
    const signedIn = useSelector(state => state.signedIn);
    const id = useSelector(state => state.user._id);
    const [open, setOpen] = useState(false);
    const [ characters, setCharacters ] = useState([]);
    const [ character, setCharacter ] = useState({
        name: ''
    });


    useEffect(() => {
        client.service('users').get(id).then(result => {
            console.log(result.characters);
            setCharacters(result.characters);
        }).catch((err) => {
            console.log(err);
            setCharacters([]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                { signedIn ? renderCharacterSelection() : renderSignIn()}
            </Dialog>
        </span>
    )
}


export default JoinParty;
