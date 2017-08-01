const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLBoolean} = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')

module.exports = new GraphQLObjectType({
    name: 'TodoItem',
    description: 'A list of items todo',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the list.',
        },
        title: {
            type: GraphQLString,
            description: 'The name of the list.',
        },
        done: {
            type: GraphQLBoolean,
            description: 'If the task is completed',
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
