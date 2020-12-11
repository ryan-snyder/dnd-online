const { Service } = require('feathers-nedb');

exports.Users = class Users extends Service {
  // create a new user and add additional data
  create(data, params) {
    const { email, password } = data;
    //TODO: Consider removing characters and parties from user info
    const user = {
      email,
      password,
      characters: [],
      parties: []
    };

    return super.create(user, params);
  }

    
};
