const User = require('../../models/user')
const {resolver} = require('graphql-sequelize')
const userType = require('../type/user')

module.exports = {
    description: 'Get current user',
    type: userType,
    resolve: resolver(User, {
        before: function(findOptions, args, context, info) {
            if (!context.user || !context.user.id) {
                throw new Error("No current user!");
            }
            findOptions.where = {
                id: context.user.id
            };
            return findOptions;
        }
    })
}
