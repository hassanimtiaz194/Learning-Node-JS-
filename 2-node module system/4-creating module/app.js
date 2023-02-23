//to load a module we use require function
var logger = require('./logger');
console.log(logger);    //{ log: [Function: log] }
console.log(logger);   //[Function: log]
logger('message');