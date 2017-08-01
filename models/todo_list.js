const Sequelize = require('sequelize')
const sequelize = require('../support/db')
const TodoItem = require('./todo_item')

const TodoList = sequelize.define('todo_list', {
    title: {type: Sequelize.STRING, allowNull: false}
})

TodoList.Items = TodoList.hasMany(TodoItem, {foreignKey: {allowNull: false}})

module.exports = TodoList
