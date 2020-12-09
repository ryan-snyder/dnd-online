import React, { useState, useEffect, useContext } from 'react';
import client from '../feather/feathers';
import CharacterCreation from './CharacterCreation';
import { Context } from '../Store/Store';
import { getCharacter, updateCharacter } from '../api/index';


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
    },[state]);

    const handleSave = (id, characters) => {
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
};


export default CharacterEdit;