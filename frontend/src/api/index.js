
/**
 * Index file for api folder
 * 
 * 
 * 
 * This will implement superagent and add handlers for api requests to
 * dnd5e.co
 * 
 * 
 * 
 * TODO:
 * Download this api myself because right now you can't make browser requests with it which is dumb
 * 
 * 
 * or we could serve it myself but I'd rather not
 * 
 * for now, im going to put our backend api calls in here.
 * Should make a seperate file for them eventually
 * 
 */

import client from '../feather/feathers';

export const getClasses = () => [
    {
        "name": "wizard",
    },
    {
        "name": "bard"
    }
];

export const createCharacter = (character, user) => {
    return client.service('characters').create(character, user);
}

export const getCharacter = (id) => {
    return client.service('characters').get(id);
}

export const updateCharacter = (id, characters) => {
    return client.service('characters').patch(id, { character: characters });
}

export const deleteCharacter = (id) => {
    return client.service('characters').remove(id);
}

export const getAllCharacters =  () => client.service('characters').find();

export const getAllParties = () => client.service('party').find();

export const createParty = (name) => {
    return client.service('party').create({
        name
    });
}


//export const getSpells = (query = {}) => superagent.get(`${baseUrl}spells`).query(query);

//export const getFeatures = (query = {}) => superagent.get(`${baseUrl}features`).query(query);
