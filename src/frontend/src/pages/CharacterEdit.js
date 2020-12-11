import React, { useState, useEffect, useContext } from 'react';
import CharacterCreation from './CharacterCreation';


function CharacterEdit(props) {
    const { id } = props.match.params;
    const [character, setCharacter] = useState(undefined);

    useEffect(() => {
        console.log('Getting characters');
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSave = (characters) => {
        console.log('updating characters');
    }
    return (
        <span>
            <CharacterCreation handleUpdate={handleSave} id={id} character={character} message={<p>You are currently editing character {id} </p>}/>
        </span>
    )
}


export default CharacterEdit;
