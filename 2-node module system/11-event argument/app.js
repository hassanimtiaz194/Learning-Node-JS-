// a signal that something has happened in application

const EventEmitter = require('events'); // this is a class it a blueprint
const emitter = new EventEmitter(); //its an instance

// register a listener
emitter.on('messageLogged', (arg) => {
    console.log('listerner called', arg)
});
// event raised
emitter.emit('messageLogged', { id: 1, url: 'http://' })
//output
//listerner called { id: 1, url: 'http://' }