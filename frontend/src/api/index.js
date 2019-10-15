
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
 */
export const getClasses = () => [
    {
        "name": "wizard",
    },
    {
        "name": "bard"
    }
];

//export const getSpells = (query = {}) => superagent.get(`${baseUrl}spells`).query(query);

//export const getFeatures = (query = {}) => superagent.get(`${baseUrl}features`).query(query);
