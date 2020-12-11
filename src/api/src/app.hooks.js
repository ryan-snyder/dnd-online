// Application hooks that run for every service
const hooks = require('./utils/hooks');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hooks.create],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
