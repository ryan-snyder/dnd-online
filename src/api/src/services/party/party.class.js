const { Service } = require('feathers-nedb');

exports.Party = class Party extends Service {
  
  // So...when we create a party for the user
  // we want to set the members as an array
  // containing the user that created it, with the permission admin
  create(data, params) {
    const { name, url} = data;
    const { user } = params;

    const partyData = {
      name,
      members: [{
        id: user._id,
        permission: 'admin',
        character: data.character || null,
      }],
      inviteURL: url
    };

    return super.create(partyData, params);     
  }
  
  patch(id, data, params) {
    const { character } = data;

    const { user } = params;

    // this is safe because this is done server side
    // In other words...even if someone who isn't supposed to hit this does
    // they won't be able to see anything they aren't supposed to
    const currentParty = super.get(id);

    // A better way of doing this would be to confirm the join with the owner
    const party = {
      members: currentParty.push({
        id: user._id,
        permission: 'member',
        character
      })
    };

    return super.patch(id, party, params);
  }

  find(params) {
    const { user } = params;

    return super.find({
      query: {
        members: {
          $elemMatch: {
            id: user._id
          }
        }
      }
    });
  }
};
