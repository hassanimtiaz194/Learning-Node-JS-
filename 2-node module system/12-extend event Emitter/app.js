const EventEmitter = require('events'); // this is a class it a blueprint
//const emitter = new EventEmitter(); //its an instance we are no logger using it
// because we are using extends in logger file


const Logger = require('./logger');
const logger = new Logger();

// register a listener
logger.on('messageLogged', (arg) => {
    console.log('listerner called', arg)
});

logger.log('message')