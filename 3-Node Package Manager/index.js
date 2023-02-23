var _ = require('underscore');
// first it assumes its a core module
// than file or folder
// in the end node_module
var results = _.contains([1, 2, 3], 2);
console.log(results);

//result is true it contains true