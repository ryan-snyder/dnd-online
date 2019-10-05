import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getClasses } from '../api';



function CharacterCreation(props) {
    const { signedIn, user } = props;
    const [ charClass, setClass] = React.useState({
        charClass: ''
    });

    const [ options, setOptions ] = React.useState([]);

    const handleChange = (event) => {
        setClass(event.target.value);
    }

    React.useEffect(() => {
        getClasses().then(res => {
            console.log(res.results);
            setOptions(res.results)
        });
    })

    return (
        <span>
            <p>Character Creation Screen</p>
            {signedIn ? <p>Welcome {user.email}</p> : <p> You are not logged in but you can still make a character</p>}
            <Select
                value={charClass}
                onChange={handleChange}
            >
                {options.forEach(option => 
                        <MenuItem value={option.name}>{option.name}</MenuItem>
                )}
            </Select>
        </span>
    )
}

CharacterCreation.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default CharacterCreation;