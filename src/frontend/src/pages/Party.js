import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';



function Party(props) {
    const signedIn = useSelector(state => state.userState.signedIn);
    const user = useSelector(state => state.userState.user);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const parties = useSelector(state => state.parties);
    const dispatch = useDispatch();


    const handleCreate = () => {
        console.log("Creating party");
        dispatch({
            type: 'CREATE_PARTY',
            payload: {name}
        })
        handleClose();
    }
    const handleChange = (event) => setName(event.target.value);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setName('');
        setOpen(false)
    };
    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_PARTY',
            payload: {
                id
            }
        })
    }
    // Change party list to expansion panel?
    // So that you can see current members?
    // Or should you have to edit it in order to see that
    // TODO: Add dropdown to select character or indicate that you are DM
    return (
        <span>
            <p>Party Creation and Viewer Screen</p>
            {signedIn ? <p>Welcome {user.email}</p> : <p> Please log in or make an account to create or view your parties</p>}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create a Party
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a Party</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the name of your party
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={handleChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
            {parties.map((party, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                {party.name}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                Invite URL:
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                {`http://localhost:3000/join${party.inviteURL}`}
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Link to={`/party/${party._id}`}><Button>View Party</Button></Link>
                                <IconButton onClick={() => handleDelete(party._id) } edge="end">
                                            <DeleteIcon />
                                </IconButton>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
            })}
        </span>
    )
}

export default Party;
