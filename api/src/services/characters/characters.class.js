const { Service } = require('feathers-nedb');

exports.Characters = class Characters extends Service {
  // When a new character is **SAVED**
  // add that character to the database with the associated data/userId
  // as well call user.update and add it to the users characters with the name of the character
  // and the uniqueId of the character
  // Or do we call this from the user class?
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
    console.log(user);
    
    return super.get(id, params);
  }

};
