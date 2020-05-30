const config = require('./config.js');
const directories = require('./directories.js');
const server = require('./server.js');


// Generate Directories
directories(config.basePath);

// Start Server
server(config);

