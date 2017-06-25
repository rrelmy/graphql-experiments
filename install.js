const sequelize = require('./support/db')
const apikeygen = require('apikeygen').apikey

// load all modules
require('./models')
const User = require('./models/user')
const UserApiKey = require('./models/user_api_key')

sequelize.sync({force: true}).then(() => {
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
        key: apikeygen()
    })
}).catch(function () {
    console.error('Error syncing models')
}).then(function () {
    console.info('Closing connection')
    sequelize.close()
});
