import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { makeStyles } from '@material-ui/core/styles';
import { getClasses } from '../api';
import client from '../feather/client';
import { Context } from '../Store/Store';
import { defaultCharacter, rollStats } from '../util/util';

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'grey',
    },
    inline: {
      display: 'inline',
    },
  }));

function CharacterCreation(props) {
    const classes = useStyles();

    const [state] = useContext(Context);
    const { id, handleUpdate } = props;
    const [ options, setOptions ] = useState({});

    useEffect(() => {
        setOptions({
            class: getClasses() 
        });
    }, [])
    /**
     * Any attribute that has a name, means that that attribute has effects on our character.
     * I.E class, race, and background can all modify our ability scores
     * level is self explanatory
     * spells is again self explanatory since you can have more than one spell
     * 
     */
    // Should we remember stats on a page reload?
    // Or would they have to save it?
    const [ character, setCharacter] = useState(defaultCharacter);

    useEffect(() => {
        console.log(props)
        if(props.character) {
            setCharacter(props.character);
        }
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.character]);

    const returnStats = (values) => Object.entries(character.stats.abilities).map((entry, index) => {
        entry[1] = values[index];
        return entry;
    });

    const handleUpdates = () => {
        handleUpdate(id, character);
    }

    const handleSave = () => {
        const { user, signedIn } = state;
        console.log(user);
        console.log(character);
        if(signedIn) {
            client.service('characters').create(character, {user}).then(result => {
                console.log(result);
                console.log(`Created Character for ${user.email}`);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('Show a snackbar or popup asking them to make an account...');
        }
    }
    // handle change for dropdown lists
    const handleChangeDropDown = (event) => {
        const value = options[event.target.name].find((val) => val.name === event.target.value);
        setCharacter(oldCharacter => ({
            ...oldCharacter,
            [event.target.name]: value || {
                name: ''
            }
        }));
    }

    const handleChangeDescription = (event) => {
        const value = event.target.value;
        const description = {
            ...character.description,
            [event.target.name]: value || ''
        };
        setCharacter({...character, description});
    }

    const handleShuffleUp = (index) => {
        // get the array of values
        console.log(index);
        const values = Object.values(character.stats.abilities);
        // remove the value we want to shuffle from the array
        const shuffle = values.splice(index, 1).pop();
        // put the value we want to shuffle back in the array
        // if the value was at the start of the array it will be placed at the end
        // maybe? We'll see
        index === 0 ? values.push(shuffle) : values.splice(index-1, 0, shuffle);
        const stats = returnStats(values);

        setCharacter({...character, stats: {abilities: Object.fromEntries(stats)} });
    }

    const handleShuffleDown = (index) => {
        // get the array of values
        const values = Object.values(character.stats.abilities);
        // remove the value we want to shuffle from the array
        const shuffle = values.splice(index, 1).pop();
        index === values.length ? values.unshift(shuffle) : values.splice(index+1, 0, shuffle);

        const stats = returnStats(values);

        setCharacter({...character, stats: {abilities: Object.fromEntries(stats)}});
    }
    // Based off of dnd player handbook
    // which stats to roll 4 d6 and take the three highest values
    const generateValue = () => {
        // What this will do is generate our array of "stats"
        // and then apply them to our object
        // We will then allow the user to either roll again, 
        // or shift the values around
        setCharacter({...character, stats: rollStats(character.stats)});
    }
    /**
     * All we want to do is make some basic stuff
     * Main things to implement would be stats,
     * classes
     * some basic spells, etc
     * 
     * 
     * 
     * We should prompt them to save if they try to navigate away...
     * As well if they're logged in, show them a list of characters to edit or let them make a new one
     * BUT the above is first
     * 
     * TODO:
     * Perhaps neaten this up a bit. Move stuff into seperate components? 
     */
    return(
        <span>
            <p>Character Creation Screen</p>
            {props.message || (state.signedIn ? <p>Welcome {state.user.email}</p> : <p> You are not logged in but you can still make a character</p>)}
            <Button onClick={handleUpdate ? handleUpdates : handleSave}>Save</Button>
            <Select
                value={character.class.name}
                onChange={handleChangeDropDown}
                displayEmpty
                name="class"
            >
                <MenuItem value=''><em>Select a class</em></MenuItem>
                {options.class &&
                    options.class.map(item=> <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)
                }
            </Select>
            <FormControl disabled>
                <Select
                    value={character.level}
                    onChange={handleChangeDropDown}
                    displayEmpty
                    name="level"
                >
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    Character Details:
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {Object.keys(character.description).map((keyName, keyIndex) => 
                        <FormControl key={keyIndex}>
                            <TextField
                                name={keyName}
                                label={keyName}
                                value={character.description[keyName]}
                                onChange={handleChangeDescription}
                                inputProps={keyName === 'age' ? {
                                    type: 'number'
                                } : {}}
                            />
                        </FormControl>
                    )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    Character Stats: 
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List className={classes.root}>
                        {Object.keys(character.stats.abilities).map(function(keyName, keyIndex) {
                            return (
                                <ListItem button divider key={keyIndex}>
                                    <ListItemText
                                        primary={keyName.toUpperCase()}
                                        secondary={character.stats.abilities[keyName]}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => handleShuffleUp(keyIndex)} edge="end">
                                            <KeyboardArrowUpIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => handleShuffleDown(keyIndex)} edge="end">
                                            <KeyboardArrowDownIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button onClick={generateValue}>Roll stats</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </span>
    )
}

CharacterCreation.propTypes = {
    character: PropTypes.object,
    handleUpdate: PropTypes.func,
    message: PropTypes.element,
    id: PropTypes.string,
}


export default CharacterCreation;
