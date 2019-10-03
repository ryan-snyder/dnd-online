import React from 'react';
import PropTypes from 'prop-types';




function CharacterCreation(props) {
    const { signedIn, user } = props;

    return (
        <span>
            <p>Character Creation Screen</p>
            {signedIn ? <p>Welcome {user.email}</p> : <p> You are not logged in but you can still make a character</p>}

        </span>
    )
}

CharacterCreation.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default CharacterCreation;