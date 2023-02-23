//used for creating networking applications
// create a server that listens http request on the given port 
// backend services for client applications
// in real world we are not using http module to build backend services we are using express js 
//which build upon http module 

const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('hello world');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
}); // also has the capibility of event emitter
// handler of listener
/* server.on('connection', (socket) => {
    console.log('New Connection...');
}) */
server.listen(3001);
console.log('listening on port 3001')

