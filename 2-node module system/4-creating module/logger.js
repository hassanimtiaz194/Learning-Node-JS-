var url = 'http://mylogger.io/log';

function log(message) {
    // send an http request
    console.log(message);
}

// making variable and function public
//module.exports.log = log; // for exporting function
//module.exports.endPoint = url;  for exporting url
module.exports = log;