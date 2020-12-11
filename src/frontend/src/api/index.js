
/**
 * Index file for api folder
 * This will implement superagent and add handlers for api requests to
 * dnd5e.co
 * TODO:
 * Move to redux-saga file for api calls
 */
import client from '../feather/client';

export const getClasses = () => [
    {
        "name": "wizard",
    },
    {
        "name": "bard"
    }
];

const createCharacter = (character, user) => {
    return client.service('characters').create(character, user);
}

const getCharacter = (id) => {
    return client.service('characters').get(id);
}

const updateCharacter = (id, characters) => {
    return client.service('characters').patch(id, { character: characters });
}

const deleteCharacter = (id) => {
    return client.service('characters').remove(id);
}

const getAllCharacters =  () => client.service('characters').find();

const getAllParties = () => client.service('party').find();

const createParty = (name) => {
    return client.service('party').create({
        name
    });
}

const Api = {
    createCharacter,
    getCharacter,
    updateCharacter,
    deleteCharacter,
    getAllCharacters,
    getAllParties,
    createParty
};
//export const getSpells = (query = {}) => superagent.get(`${baseUrl}spells`).query(query);
//export const getFeatures = (query = {}) => superagent.get(`${baseUrl}features`).query(query);
export default Api;
