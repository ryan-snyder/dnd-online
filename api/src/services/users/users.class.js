const { Service } = require('feathers-nedb');

exports.Users = class Users extends Service {
    setup(app) {
        this.app = app;
    }
    // create a new user and add additional data
    create(data, params) {
        const { email, password } = data;

        const user = {
            email,
            password,
            characters: [],
            parties: []
        };

        return super.create(user, params);
    }

    
};
