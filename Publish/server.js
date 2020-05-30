const bodyParser = require('body-parser');
var express = require("express");
var app = express();

app.use(bodyParser.json());

var server = app.listen(8183, '0.0.0.0', () => {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    
    console.log('Listening to http://%s:%s', host, port);
});