const userType = require('../type/user')

module.exports = {
    description: 'Get current user',
    type: userType,
    resolve: function (root, args, context) {
        if (!context.user || !context.user.id) {
            throw new Error("No current user!");
        }

        return context.user
    }
}
