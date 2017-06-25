const Sequelize = require('sequelize')
const sequelize = require('../support/db')

const UserApiKey = sequelize.define('user_api_key', {
    description: Sequelize.STRING,
    key: {type: Sequelize.STRING, allowNull: false, unique: true},
    last_used_at: Sequelize.DATE
})

module.exports = UserApiKey