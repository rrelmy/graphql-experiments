const Sequelize = require('sequelize')
const sequelize = require('../support/db')

module.exports = sequelize.define('user', {
    username: {type: Sequelize.STRING, allowNull: false, unique: true},
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
})
