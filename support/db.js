const Sequelize = require('sequelize');
const config = require('../config');

module.exports = new Sequelize(config.SQL_DATABASE, config.SQL_USER, config.SQL_PASSWORD, {
    host: config.SQL_HOST,
    dialect: config.SQL_DIALECT,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        underscored: true
    }
})
