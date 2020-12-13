import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCreation from './CharacterCreation';


function CharacterEdit(props) {
    const { id } = props.match.params;
    const signedIn = useSelector(state => state.userState.signedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_CHARACTER',
            payload: {
                id
            }
        });
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSave = (id, character) => {
        console.log('updating characters');
        dispatch({
            type: 'UPDATE_CHARACTER',
            payload: {
                id,
                character
            }
        })
    }
    return (
        <span>
            { signedIn && 
                <CharacterCreation handleUpdate={handleSave} id={id} message={<p>You are currently editing character {id} </p>}/>
            }
        </span>
    )
}


export default CharacterEdit;
