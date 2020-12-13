module.exports = function(app) {
  /**
   * In the future, this will be used to publish events and update the app
   * In that way, instead of calling an api function to check for updates, we will just check the channels
   * As well, this will be used for party events and messages, etc
   * So its a twofold purpose:
   * 
   * 1: Back-end update notifications
   * 2: User-facing events
   * 
   * 
   * Would also be useful for a mobile app if that ever happens or at least browser notifications
   */
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    console.log('Got connection');
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;
      console.log(user);
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      
      // when a user logs on, add the user to all of his party channels
      console.log('Adding user to the following rooms');
      console.log(user.parties);
      if(Array.isArray(user.parties)) user.parties.forEach(party => app.channel(`party/${party.id}`).join(connection));

      // as well, add him to his own channel. This will be used for stat tracking and so on
      console.log(`Adding user to the users/${user._id} room`);
      app.channel(`users/${user._id}`).join(connection);
    }
  });

  app.on('logout', (authResult, { connection }) => {
    console.log('Logged out');
    if(connection) {
      // On successful logout, connection is automatically removed from existing channels
      app.channel('anonymous').join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    /**
     * We will add more stringent publish rules here
     * For example only party members or the user who owns the character should be able to see character events
     * As well, only party members should be able to see party events
     * And only the user should be able to see user events
     */

    console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
