// Initializes the `characters` service on path `/characters`
const { Characters } = require('./characters.class');
const createModel = require('../../models/characters.model');
const hooks = require('./characters.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/characters', new Characters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('characters');

  service.hooks(hooks);
};
