import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { parseAndRoll } from 'roll-parser';
import { getClasses } from '../api';

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

    const { signedIn, user } = props;
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
    const [ character, setCharacter] = useState({
        description: {
            name: '',
            playerName: '',
            age: 0,
            gender: '',
            height: '',
            weight: ''
        },
        class: {
            name: ''
        },
        race: {
            name: ''
        },
        level: 1,
        alignment: '',
        background: {
            name: ''
        },
        spells: {
            cantrips: [{
                name: ''
            }],
            spells: [{
                name: ''
            }]
        },
        equipment: [],
        stats: {
            abilities: {
                str: 8,
                dex: 8,
                con: 8,
                int: 8, 
                wis: 8,
                cha: 8
            },
            feats: [{
                name: ''
            }]
        },
        proficiencies: [{
            name: ''
        }]
    });

    // handle change for dropdown lists
    const handleChange = (event) => {
        const value = options[event.target.name].find((value) => value.name === event.target.value);
        setCharacter(oldCharacter => ({
            ...oldCharacter,
            [event.target.name]: value || {
                name: ''
            }
        }));
    }
    // Based off of dnd player handbook
    // which stats to roll 4 d6 and take the three highest values
    const generateValue = () => {
        // What this will do is generate our array of "stats"
        // and then apply them to our object
        // We will then allow the user to either roll again, 
        // or shift the values around
        for ( let key in character.stats.abilities ) {
            const { rolls } = parseAndRoll('4d6');
            rolls.sort().splice(0, 1);
            const stat = rolls.reduce((a, c) => a + c);
            character.stats.abilities[key] = stat;
        }
        setCharacter({...character, stats: character.stats});
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
     */
    return(
        <span>
            <p>Character Creation Screen</p>
            {signedIn ? <p>Welcome {user.email}</p> : <p> You are not logged in but you can still make a character</p>}
            <Select
                value={character.class.name}
                onChange={handleChange}
                displayEmpty
                name="class"
            >
                <MenuItem value=''><em>Select a class</em></MenuItem>
                {options.class &&
                    options.class.map(item=> <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)
                }
            </Select>
            <Button onClick={generateValue}>Roll stats</Button>
            <List className={classes.root}>
              {Object.keys(character.stats.abilities).map(function(keyName, keyIndex) {
                return (
                <ListItem>
                    <ListItemText
                        primary={keyName}
                        secondary={character.stats.abilities[keyName]}
                    />
                </ListItem>
                )
              })}
            </List>
        </span>
    )
}

CharacterCreation.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default CharacterCreation;