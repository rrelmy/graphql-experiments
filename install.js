const sequelize = require('./support/db')
const apikeygen = require('apikeygen').apikey

// load all modules
require('./models')
const User = require('./models/user')
const UserApiKey = require('./models/user_api_key')

const FORCE_SYNC = false;

sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
    .then(function(results) {
        return sequelize.sync({force: FORCE_SYNC}).then(() => {
            console.log('Models synced')

            // create dummy user
            console.log('Create dummy user')
            return User
                .findOrCreate({where: {username: 'admin'}, defaults: {firstname: 'John', lastname: 'Doe'}})
                .spread((user) => {
                    return user.id
                })
        }).then(function (userId) {
            if (!userId) {
                throw new Error('no user id found')
            }

            console.log('Create dummy api key')
            return UserApiKey.create({
                description: 'Installation key',
                key: apikeygen(),
                user_id: userId
            })
        }).catch(function (err) {
            console.error('Error syncing models')
            console.error(err)
        }).then(function () {
            console.info('Closing connection')
            sequelize.close()
        });
    });
