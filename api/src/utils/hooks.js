/* eslint-disable require-atomic-updates */
/* eslint-disable indent */
const shortid = require('shortid');
const logger = require('../logger');

const generateUrl = async (context) => {
  const url = `/${shortid.generate()}`;
  logger.info('Url is', url);
  context.data.url = url;
  // This will get set in the party db
  // Client side: We will have to determine some approach to verifying and adding a new user to the party
  // I think we move this into the party create call. Instead of in a hook? or we just make this a function instead.
  // And then whoever needs it can use it
  return context;
};

const create = async (context) => {
  let result = undefined;
  if(context.params.provider !== 'internal') {
    if(context.path === 'characters' ) {
        result = await context.app.service('characters').create(context.data, {...context.params, provider: 'internal'});
        // once we get the api sorted out
        // we will have to change this to update the current connected user
        const updatedUser = await context.app.service('users').get('2jB8PZZQ0c4680pt').then(user => {
          user.characters.push({
            id: result._id,
            name: result.character.name,
            class: result.character.class
          });
          return user;
        });
        await context.app.service('users').patch('2jB8PZZQ0c4680pt', updatedUser);
        context.result = result;
    } else if (context.path === 'party') {
      //Create a party for the user and generate 
      result = await context.app.service('party').create(context.data, {...context.params, provider: 'internal'});

      const updatedUser = await context.app.service('users').get('2jB8PZZQ0c4680pt').then(user => {
        user.parties.push({
          id: result._id,
          name: result.party.name
        });
        return user;
      });

      await context.app.service('users').patch('2jB8PZZQ0c4680pt', updatedUser);
      context.result = result;
    }
  }
  return context;
};

module.exports = {
  generateUrl,
  create
};