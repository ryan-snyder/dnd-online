import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListView from '../components/ListView';


function ViewCharacters(props) {
    const user = useSelector(state => state.userState.user);
    const signedIn = useSelector(state => state.userState.signedIn);
    const dispatch = useDispatch();
    const characters = useSelector(state => state.characters);

    useEffect(() => {
        console.log('Current list of characters is...');
        console.log(characters);
        
    }, [characters]);
    // ideally we move all this to a seperate file or something
    const handleDelete = (id) => {
        console.log(id);
        console.log("Deleting charcters");
        dispatch({
            type: 'DELETE_CHARACTER',
            payload: {
                id
            }
        })
    }
    const data = characters.length === 0 ? [] : characters.map((character => {
        console.log('setting data');
        return {
            primaryDescription: character.character.description.name,
            secondaryDescription: `Class: ${character.character.class.name} Race: ${character.character.race.name} Level: ${character.character.level}`,
            link: `/character/${character._id}`,
            id: character._id
        }
    }));

    return (
        <span>
            {signedIn ? <p>Welcome {user.email}</p> : <p> If you are not logged in and you're on this page, please sign in</p>}
            <p>View your characters</p>
            <ListView data = {data} handleDelete = {handleDelete} message={`You don't have any characters`} />
        </span>
    )
}

export default ViewCharacters;
