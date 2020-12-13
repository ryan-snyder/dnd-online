const { Service } = require('feathers-nedb');
const logger = require('../../logger');
exports.Characters = class Characters extends Service {
  // When a new character is **SAVED**
  // add that character to the database with the associated data/userId
  create(data, params) {
    const id = params.user._id;
    // NOTE: We will have to test this because all we want is the user id
    // But we will have to implement some basic front end stuff first
    logger.info('User is ', id);

    const characterData = {
      owner: id,
      character: data
    };
    return super.create(characterData, params);
  }

  find(params) {
    const { user } = params;

    return super.find({
      query: {
        owner: user._id
      }
    });
  }

  // What we should do...is when a user tries to get a character...
  // If they own it they can see it completely
  // If they are a member of a party containing the character, they can see some
  // If they are an admin of a party containing the character, they can see it completely
  // If they have a share link, they can see some/completely, depending on the settings
  get(id, params) {
    const { user } = params;
    // get a character that belongs to the current user
    logger.info('User is', user);
    /**
     * I think what we can do is
     * call the get method...and get the character that is being requested
     * then, check whether we return all/some/none of the info
     * That is most likely the most efficient way
     * We should have a seperate function that returns the correct fields
     */
    logger.info('Fetching character ', id);
    return super.get(id);
  }

  /**
   * 
   * Remove character
   */
  remove(id, params) {
    const { user } = params;
    logger.info('User is', user);

    return super.remove(id, params);
  }



};
