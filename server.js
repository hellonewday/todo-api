var http = require('http');
var app = require('./app');
const PORT = process.env.PORT || 1234;
http.createServer(app).listen(PORT);
