const assert = require('assert');
const app = require('../../src/app');

describe('\'party\' service', () => {
  it('registered the service', () => {
    const service = app.service('party');

    assert.ok(service, 'Registered the service');
  });
});
