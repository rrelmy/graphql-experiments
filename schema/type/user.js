const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString} = require('graphql')

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
        }
    }
})
