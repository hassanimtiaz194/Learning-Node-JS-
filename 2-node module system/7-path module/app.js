const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj) 
//output
/*   {
    root: 'D:\\',
    dir: 'D:\\Projects\\Node\\2-node module system\\path module',
    base: 'app.js',
    ext: '.js',
    name: 'app'
  } */

