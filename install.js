const sequelize = require('./support/db')

// load all modules
require('./models')

sequelize.sync({force: true}).then(() => {
    console.log('Models synced')
}).catch(function () {
    console.error('Error syncing models')
}).then(function () {
    sequelize.close()
});
