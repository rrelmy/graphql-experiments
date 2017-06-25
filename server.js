const config = require('./config')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const morgan = require('morgan')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('./models/user')

// init express
const app = express()

if (config.ENV === 'dev') {
    app.use(morgan('dev'))
}

passport.use(new BearerStrategy(
    function(token, done) {
        User.findByApiKey(token, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
));

// define schema
const schema = require('./schema')

// routes
app.use('/', passport.authenticate('bearer', { session: false }), graphqlHTTP({
    schema: schema,
    graphiql: config.ENABLE_GRAPHIQL
}))

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    if (err.name === 'ValidationError') {
        res.status(400).json({error: err.message});
    } else {
        res.status(500).json({error: 'There was an error processing the request.'});
    }
})

// start
app.listen(config.WEB_PORT, function () {
    console.log('Server running on port ' + config.WEB_PORT)
})
