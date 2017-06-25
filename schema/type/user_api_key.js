const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString} = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')

module.exports = new GraphQLObjectType({
    name: 'UserApiKey',
    description: 'A user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the key.',
        },
        key: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The username of the key.',
        },
        description: {
            type: GraphQLString,
            description: 'The firstname of the key.',
        },
        last_used_at: {
            type: GraphQLDateTime,
            description: 'When the key was last used.',
        },
        updated_at: {
            type: GraphQLDateTime,
            description: 'The last update date of the key.',
        },
        created_at: {
            type: GraphQLDateTime,
            description: 'The creation date of the key.',
        }
    }
})
