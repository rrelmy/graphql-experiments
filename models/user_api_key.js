const Sequelize = require('sequelize')
const sequelize = require('../support/db')
const User = require('./user')

const UserApiKey = sequelize.define('user_api_key', {
    description: Sequelize.STRING,
    key: {type: Sequelize.STRING, allowNull: false, unique: true},
    last_used_at: Sequelize.DATE
})

UserApiKey.belongsTo(User)

module.exports = UserApiKey