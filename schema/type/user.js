const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList} = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')
const apiKeyType = require('./user_api_key')
const {resolver} = require('graphql-sequelize')
const User = require('../../models/user')

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the user.',
        },
        username: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The username of the user.',
        },
        firstname: {
            type: GraphQLString,
            description: 'The firstname of the user.',
        },
        lastname: {
            type: GraphQLString,
            description: 'The lastname of the user.',
        },
        api_keys: {
            type: new GraphQLList(apiKeyType),
            description: 'API keys of the user',
            args: {
                key: {
                    description: 'API key',
                    type: GraphQLString
                },
                id: {
                    description: 'ID of the API key',
                    type: GraphQLInt
                }
            },
            resolve: resolver(User.ApiKeys)
        },
        updated_at: {
            type: GraphQLDateTime,
            description: 'The last update date of the user.',
        },
        created_at: {
            type: GraphQLDateTime,
            description: 'The creation date of the user.',
        }
    }
})
