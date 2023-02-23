const EventEmitter = require('events'); // this is a class it a blueprint
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        // event raised instean of using this we will use this because of extends
        // if we use emitter.emit we are creating new instance
        //emitter.emit('messageLogged', { id: 1, url: 'http://' })
        this.emit('messageLogged', { id: 1, url: 'http://' })
    }
}


module.exports = Logger;