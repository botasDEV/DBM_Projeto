const fs = require('fs');
const mustache = require('mustache');
const childProcess = require("child_process");


module.exports = (serverConfigs) => {
    serverConfigs.staticFiles.forEach(staticFile => {
        fs.copyFileSync(staticFile.originalPath, staticFile.destinationPath);
    });
    let template = fs.readFileSync('server/server.mustache').toString();
    let view = {
        host: serverConfigs.host,
        port: serverConfigs.port
    };

    let output = mustache.render(template, view);
    fs.writeFileSync(serverConfigs.target, output);
    childProcess.fork(serverConfigs.target);
}