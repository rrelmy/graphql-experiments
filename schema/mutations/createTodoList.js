const {GraphQLString, GraphQLNonNull} = require('graphql')
const {resolver} = require('graphql-sequelize')
const todoListType = require('../type/todo_list')
const TodoList = require('../../models/todo_list')

module.exports = {
    type: todoListType,
    args: {
        title: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (source, {title}, context, info) => {
        if (!context.user || !context.user.id) {
            throw new Error("No current user!")
        }

        return TodoList.create({
            title: title,
            user_id: context.user.id
        }).then((model) => {
            return resolver(TodoList, {
                before: function(findOptions, {list_id}, context, info) {
                    findOptions.where = {
                        id: list_id
                    };
                    return findOptions;
                }
            })(source, {list_id: model.id}, context, info)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
}
