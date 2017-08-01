const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList} = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')
const todoItemType = require('./todo_item')
const {resolver} = require('graphql-sequelize')
const User = require('../../models/user')

module.exports = new GraphQLObjectType({
    name: 'TodoList',
    description: 'A list of items todo',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the list.',
        },
        title: {
            type: GraphQLString,
            description: 'The firstname of the list.',
        },
        items: {
            type: new GraphQLList(todoItemType),
            description: 'Items in the list',
            args: {
                id: {
                    description: 'ID of the API key',
                    type: GraphQLInt
                },
                done: {
                    description: 'Filter for open/done items',
                    type: GraphQLBoolean
                }
            },
            resolve: resolver(User.ApiKeys)
        },
        updated_at: {
            type: GraphQLDateTime,
            description: 'The last update date of the list.',
        },
        created_at: {
            type: GraphQLDateTime,
            description: 'The creation date of the list.',
        }
    }
})
