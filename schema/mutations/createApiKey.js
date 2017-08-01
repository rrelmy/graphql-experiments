const {GraphQLString, GraphQLNonNull} = require('graphql')
const userApiKeyType = require('../type/user_api_key')
const apikeygen = require('apikeygen').apikey
const UserApiKey = require('../../models/user_api_key')

module.exports = {
    type: userApiKeyType,
    args: {
        description: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (root, {description}, info) => {
        if (!info.user || !info.user.id) {
            throw new Error("No current user!")
        }

        return UserApiKey.create({
            description: description,
            key: apikeygen(),
            user_id: info.user.id
        }).then((model) => {
            return model
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
}
