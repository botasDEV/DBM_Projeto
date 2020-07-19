const express = require('express');
const routes = require('./routes.js');

module.exports = (config = null)=> {
    if (!config) throw 'Config cannot be null';
    
    var app = express();

    app.use((req, res, next) => {
        req.configs = config;
        next();
    });
    app.use(express.static('public'));
    app.use(routes);

    var server = app.listen(config.port, config.host, ()=> {
        var host = server.address().address === "::" ? "localhost" : server.address().address;
        var port = server.address().port;

        console.log("Listening to http://%s:%s", host, port);
    });
}