const { Service } = require('feathers-nedb');

exports.Party = class Party extends Service {
  
  // So...when we create a party for the user
  // we want to set the members as an array
  // containing the user that created it, with the permission admin
  create(data, params) {
    const { name, character, url} = data;
    const { user } = params;

    const partyData = {
      name,
      members: [{
        id: user,
        permission: 'admin',
        character,
      }],
      inviteURL: url
    };

    return super.create(partyData, params);     
  }
};
