//custom Middleware Function
function log(req, res, next) {
    console.log('logging');
    next() // to pass control to next middleware function in pipeline 
}    // if we don't pass to next middleware request get hanging

module.exports = log;