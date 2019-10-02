const { Service } = require('feathers-nedb');
const logger = require('../../logger');
exports.Characters = class Characters extends Service {
  // When a new character is **SAVED**
  // add that character to the database with the associated data/userId
  create(data, params) {
    const { character} = data;
    const { user } = params;

    const characterData = {
      user,
      character
    };

    return super.create(characterData, params);
  }

  get(id, params) {
    const { user } = params;
    // get a character that belongs to the current user
    logger.info('User is', user);
    
    return super.get(id, params);
  }

};
