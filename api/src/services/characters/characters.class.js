const { Service } = require('feathers-nedb');

exports.Characters = class Characters extends Service {
  // When a new character is **SAVED**
  // add that character to the database with the associated data/userId
  create(data, params) {
    const { character } = data;
    const { user } = params;

    const characterData = {
      user,
      character
    };
    
    return super.create(characterData, params);
  }
};
