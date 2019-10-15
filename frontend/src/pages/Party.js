import React from 'react';
import PropTypes from 'prop-types';




function Party(props) {
    const { signedIn, user } = props;

    return (
        <span>
            <p>Party Creation and Viewer Screen</p>
            {signedIn ? <p>Welcome {user.email}</p> : <p> Please log in or make an account to create or view your parties</p>}

        </span>
    )
}

Party.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}


export default Party;