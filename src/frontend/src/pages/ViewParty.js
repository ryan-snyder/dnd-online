import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListView from '../components/ListView';
/**
 * TODO
 * Page that will let you view details for a party
 * Will show current members, your character status (inventory etc)
 * If you are owner, it will let you change member permissions and remove members
 * If you are a member, it will let you add a character only if you don't have one
 * Or we add selecting a character to the Party page and JoinParty page
 * If you are the dm, it will let you start a session 
 * 
 * above is HUGE feature. Will be last thing that will be done.
 * 
 */


 function ViewParty(props) {
    const { id } = props.match.params; 
    const user = useSelector(state => state.userState.user);
    const signedIn = useSelector(state => state.userState.signedIn);
    const dispatch = useDispatch();
    const party = useSelector(state => state.currentParty);
    const characters = useSelector(state => state.characters);
    const [ character, setCharacter ] = useState(null);
    const [ permission, setPermission] = useState('member');

    useEffect(() => {
        dispatch({
            type: 'GET_PARTY',
            payload: {
                id
            }
        });
    }, []);

    useEffect(() => {
        if(!party) {
            const data = party.members.find((member) => {
                return member.id === user._id
            })
            setCharacter(data.character);
            setPermission(data.permission);
        }
    }, [party]);

    const handleChange = (event) => {
        console.log(event.currentTarget.getAttribute('id'));
        const character = characters.find(char => char.characer._id === event.currentTarget.getAttribute('id'));
        console.log(`Selected character is ${character.description.name}`)
    }
    // TODO: seperate into multiple functions for return....
    /**
     * Set currentParty like we do with character?
     * Or just fetch on page load?
     */
    return (
        <span>
            {signedIn ? <p>Welcome {user.email}</p> : <p> If you are not logged in and you're on this page, please sign in</p>}
            {party && 
            <span>
                <p>Currently viewing {party.name}</p>
                {!character && 
                    <span>
                        <p> You currently don't have a character. Please select one</p> 
                        {characters && 
                            <Select
                            onChange={handleChange}
                            displayEmpty
                            >
                                <MenuItem value=''><em>Select a Character</em></MenuItem>
                                {characters.length > 0 &&
                                    characters.map((character, index) => <MenuItem key={index} id={character._id}  value={character.character.description.name}>{character.character.description.name}</MenuItem>)
                                }
                            </Select>
                        }
                    </span> 
                }
            </span>
            }
        </span>
    )
 }

 export default ViewParty;