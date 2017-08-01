const Sequelize = require('sequelize')
const sequelize = require('../support/db')

const TodoItem = sequelize.define('todo_item', {
    title: Sequelize.STRING,
    done: Sequelize.BOOLEAN
})

module.exports = TodoItem