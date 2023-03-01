const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config')

const Joi = require('joi'); // this is a class
const express = require('express'); //loading express
const genres = require('./routes/genres') // loading genre 
const helmet = require('helmet') //A document head manager for React
const morgan = require('morgan') //HTTP request logger middleware for node.js
const logger = require('./middleware/logger')
const authenticate = require('./middleware/authenticate')

const app = express()

app.set('view engine', 'pug');  // dont need require because express will load this module internally
app.set('views', './views'); //optional only used to overide passed templates 

app.use(express.json()) // returning a middle ware
app.use(express.urlencoded({ extended: true }))  //key=value&key=value
app.use(express.static('public'))

app.use(helmet());
app.use('/api/genres', genres)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
}
dbDebugger('connected to database')


app.use(logger)
app.use(authenticate)

const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`listening on port ${port}...`) })