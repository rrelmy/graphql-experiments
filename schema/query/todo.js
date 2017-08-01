const {GraphQLList} = require('graphql')
const TodoList = require('../../models/todo_list')
const {resolver} = require('graphql-sequelize')
const todoListType = require('../type/todo_list')

module.exports = {
    description: 'Get your todo lists',
    type: new GraphQLList(todoListType),
    resolve: resolver(TodoList, {
        before: function(findOptions, args, context, info) {
            if (!context.user || !context.user.id) {
                throw new Error("No current user!");
            }
            findOptions.where = {
                user_id: context.user.id
            };
            return findOptions;
        }
    })
}
