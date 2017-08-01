const Sequelize = require('sequelize')
const sequelize = require('../support/db')
const UserApiKey = require('./user_api_key')

const User = sequelize.define('user', {
    username: {type: Sequelize.STRING, allowNull: false, unique: true},
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
})

User.ApiKeys = User.hasMany(UserApiKey, {foreignKey: {allowNull: false}})

// work list
// TODO use addon pattern
const TodoList = require('./todo_list')
User.TodoLists = User.hasMany(TodoList, {foreignKey: {allowNull: false}})

User.findByApiKey = function (key, callback) {
    UserApiKey.findOne({where: {key}})
        .then(function (apiKey) {
            apiKey.last_used_at = new Date()
            apiKey.save()
                .then(function () {
                    return User.findById(apiKey.user_id)
                })
                .then(function (user) {
                    callback(false, user)
                })
                .catch(function (err) {
                    callback(err, false)
                })
        })
        .catch(function (err) {
            callback(err, false)
        })
}

module.exports = User
