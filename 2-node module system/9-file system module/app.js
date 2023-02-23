const fs = require('fs');
// this module method have both option sync and async 
// avoid using async
const files = fs.readdirSync('./');
console.log(files);
//output
//[ 'app.js' ]

fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
})
//Result [ 'app.js' ]