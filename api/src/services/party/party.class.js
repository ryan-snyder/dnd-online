const { Service } = require('feathers-nedb');

exports.Party = class Party extends Service {
  
  // So...when we create a party for the user
  // we want to set the members as an array
  // containing the user that created it, with the permission admin
  create(data, params) {
    const { name, character } = data;
    const { user } = params;

    const partyData = {
      name,
      members: [{
        id: user._id,
        permission: 'admin',
        character
      }]
    };
    
    return super.create(partyData, params);     
  }
};
