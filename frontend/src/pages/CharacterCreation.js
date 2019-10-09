import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getClasses } from '../api';



function CharacterCreation(props) {
    const { signedIn, user } = props;
    const [ options, setOptions ] = React.useState({});

    React.useEffect(() => {
        // This will set all of our initial options
        // So stuff like class, race, level, etc
        // Basically any option that does not change based on other options
        /**
         * Pattern will be
         *  setOptions({
         *      classes: getClasses(),
         *      races: getRaces(),
         *      levels
         *  })
         *  Levels will simply just 1-whatever number
         */
        setOptions({
            class: getClasses() 
        });
    }, [])
    
    const [ character, setCharacter] = React.useState({
        class: {
            name: ''
        },
        race: '',
        levels: '',
        spells: ''
    });

    React.useEffect(() => {
        console.log(character)
     })

    const handleChange = (event) => {
        // we want to pass in the whole object to character
        // So we find the object by the event value
        const value = options[event.target.name].find((value) => value.name === event.target.value);
        console.log(value);
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