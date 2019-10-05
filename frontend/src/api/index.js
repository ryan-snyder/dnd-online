import superagent from 'superagent';
import superagentCache from 'superagent-cache';
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
superagentCache(superagent);

const baseUrl = 'http://dnd5eapi.co/api/';


export const getClasses = () => superagent.get(`${baseUrl}classes`);

export const getSpells = (query = {}) => superagent.get(`${baseUrl}spells`).query(query);

export const getFeatures = (query = {}) => superagent.get(`${baseUrl}features`).query(query);
