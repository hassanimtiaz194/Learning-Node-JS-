const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config')
const Joi = require('joi'); // this is a class
const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const authenticate = require('./middleware/authenticate')
const helmet = require('helmet')
const morgan = require('morgan')

app.set('view engine', 'pug');  // dont need require because express will load this module internally
app.set('views', './views'); //optional only used to overide passed templates 

app.use(express.json()) // returning a middle ware

app.use(express.urlencoded({ extended: true }))  //key=value&key=value

app.use(express.static('public'))

app.use(helmet());

app.use('/', home) 
app.use('/api/courses', courses)


console.log(app.get('env'))

console.log('Application Server=' + config.get('name'))
console.log('Mail Server=' + config.get('mail.host'))
/* console.log('Mail Server password=' + config.get('mail.password')) */

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
}
dbDebugger('connected to database')

//custom Middleware Function
app.use(function (req, res, next) {
    console.log('logging');
    next() // to pass control to next middleware function in pipeline 
})     // if we don't pass to next middleware request get hanging

/* app.use(function (req, res, next) {
    console.log('Authenticating')
    next();
}) */

app.use(logger)
app.use(authenticate)


/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
   //  res.send(req.query); 
}); */
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`listening on port ${port}...`) })
/* app.listen(3001, () => { console.log('listening on port 3001...') }) */
/* app.post();
app.put();
app.delete(); */