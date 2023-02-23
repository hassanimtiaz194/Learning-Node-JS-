// a signal that something has happened in application

const EventEmitter = require('events'); // this is a class it a blueprint
const emitter = new EventEmitter(); //its an instance

// register a listener
emitter.on('messageLogged', function () {
    console.log('listerner called')
});

//emit means making a noise , produce something
//signaling an event has occured
// raise an event
emitter.emit('messageLogged')
//  nothing will happen if no listener
// we have listener so output will be
//listerner called