const {graphql, GraphQLNonNull, GraphQLInt} = require('graphql')
const User = require('../../models/user')
const {resolver} = require('graphql-sequelize')
const userType = require('../type/user')

module.exports = {
    description: 'Get User',
    type: userType,
    args: {
        id: {
            description: 'id of the user',
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: resolver(User)
}
