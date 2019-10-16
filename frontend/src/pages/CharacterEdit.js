import React, { useState, useEffect } from 'react';
import client from '../feather/feathers';
import CharacterCreation from './CharacterCreation';


function CharacterEdit(props) {
    const { id } = props.match.params;
    const {signedIn, user } = props;
    const [character, setCharacter] = useState(undefined);

    useEffect(() => {
        client.service('characters').get(id).then(result => {
            setCharacter(result.character);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    const handleSave = (id, characters) => {
        client.service('characters').patch(id, { character: characters }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <span>
            <CharacterCreation handleSave={handleSave} id={id} character={character} signedIn={signedIn} user={user} message={<p>You are currently editing character {id} </p>}/>
        </span>
    )
};


export default CharacterEdit;