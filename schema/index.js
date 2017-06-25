const {GraphQLSchema, GraphQLObjectType} = require('graphql')
const queries = require('./query')

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    })
})