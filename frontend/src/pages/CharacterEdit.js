import React, { useState, useEffect, useContext } from 'react';
import CharacterCreation from './CharacterCreation';
import { Context } from '../Store/Store';


function CharacterEdit(props) {
    const { id } = props.match.params;
    const [state] = useContext(Context);
    const [character, setCharacter] = useState(undefined);

    useEffect(() => {
        getCharacter(id).then(result => {
            console.log(result)
            setCharacter(result.character);
        }).catch((err) => {
            console.log(err);
        });
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state]);

    const handleSave = (characters) => {
        updateCharacter(id, characters).then(result => {
            console.log(result);
            console.log('Update successful');
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <span>
            <CharacterCreation handleUpdate={handleSave} id={id} character={character} message={<p>You are currently editing character {id} </p>}/>
        </span>
    )
}


export default CharacterEdit;
