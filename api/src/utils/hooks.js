/* eslint-disable require-atomic-updates */
/* eslint-disable indent */
const shortid = require('shortid');
const logger = require('../logger');

const generateUrl = async (context) => {
  const url = `/${shortid.generate()}`;
  logger.info('Url is', url);
  context.data.url = url;
  // This will get set in the party db
  // I think we move this into the party create call. Instead of in a hook? or we just make this a function instead.
  // And then whoever needs it can use it
  return context;
};

const create = async (context) => {
  let result = undefined;
  if(context.params.provider !== 'internal') {
    if(context.path === 'characters' ) {
        result = await context.app.service('characters').create(context.data, {...context.params, provider: 'internal'});

        const updatedUser = await context.app.service('users').get(context.params.connection.user._id).then(user => {
          user.characters.push({
            id: result._id,
            name: result.character.description.name
          });
          return user;
        });
        await context.app.service('users').patch(context.params.connection.user._id, updatedUser);
        console.log(result);
        context.result = {
          message: `Created character called ${result.character.description.name}`,
          data: result
        };
    } else if (context.path === 'party') {
      
      const url = `/${shortid.generate()}`;
      console.log(url.valueOf());
      context.data.url = url; 
      result = await context.app.service('party').create(context.data, {...context.params, provider: 'internal'});
      console.log(result);
      const updatedUser = await context.app.service('users').get(context.params.connection.user._id).then(user => {
        user.parties.push({
          id: result._id,
          name: result.name,
          inviteURL: result.inviteURL
        });
        return user;
      });

      await context.app.service('users').patch(context.params.connection.user._id, updatedUser);
      context.result = {
        message: `Created party called ${result.name} with the id ${result._id}`,
        data: {
          name: result.name,
          id: result._id,
          inviteUrl: result.inviteURL
        }
      };
    }
  }
  return context;
};

module.exports = {
  generateUrl,
  create
};