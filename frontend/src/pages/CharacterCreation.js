import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getClasses } from '../api';



function CharacterCreation(props) {
    const { signedIn, user } = props;
    const [ options, setOptions ] = React.useState({});

    React.useEffect(() => {
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
     * wondering if we should store this "schema" on the backend?
     * So that we can ensure that everything matches?
     * Probably not, but we should move this into a util function?
     *  Not sure if we want to use this elsewhere or what
     * 
     */
    const [ character, setCharacter] = React.useState({
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
        </span>
    )
}

CharacterCreation.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default CharacterCreation;