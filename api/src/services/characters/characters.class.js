const { Service } = require('feathers-nedb');

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

  find(params) {
    const { query, user } = params;
    // find characters that belong to the current user
    return super.find({
      ...query,
      user
    });
  }

  get(id, params) {
    const { user } = params;
    // get a character that belongs to the current user
    console.log(user);
    
    return super.get(id, params);
  }

};
