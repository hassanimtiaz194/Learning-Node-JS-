const os = require('os');
var totalMemory = os.totalmem()
var freeMemory = os.freemem()

//template string
//es6 /es2015: ECMAScript 5
//allow you to build string with concatenation

console.log(`Total Memory: ${ totalMemory}`);
console.log(`Free Memory: ${ freeMemory}`);

//output
//Total Memory: 12645502976
//Free Memory: 6350069760

