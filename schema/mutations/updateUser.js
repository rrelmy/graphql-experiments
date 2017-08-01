const {GraphQLString, GraphQLNonNull} = require('graphql')
const userType = require('../type/user')

module.exports = {
    type: userType,
    args: {
        firstname: {type: new GraphQLNonNull(GraphQLString)},
        lastname: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (root, {firstname, lastname}, info) => {
        if (!info.user || !info.user.id) {
            throw new Error("No current user!")
        }

        return info.user.update({
            firstname,
            lastname
        }).then((model) => {
            return model
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
}
