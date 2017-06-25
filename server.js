const config = require('./config')
const express = require('express')
const graphqlHTTP = require('express-graphql')

// init express
const app = express()

// define schema
const schema = require('./schema')

// routes
app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: config.ENABLE_GRAPHIQL
}))

// start
app.listen(config.WEB_PORT, function () {
    console.log('Server running on port ' + config.WEB_PORT)
})
