const fs = require('fs');
var mustache = require('mustache');


module.exports = (server, schemas = [], appPath) => {
    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));
        let servicesDirectory = appPath + '/src/app/services/';
        if (!fs.existsSync(servicesDirectory)) {
            fs.mkdirSync(servicesDirectory)
        }
        let host = 'http://' + (server.host == '0.0.0.0' ? 'localhost' : server.host) + ':' + server.port + '/api/';
        let template = fs.readFileSync('frontend/app-service.mustache').toString();
        let target = servicesDirectory + model.title.toLowerCase() + '.service.ts';
        let view = {
            endpoint: host,
            title: model.title,
            titleLowerCase: model.title.toLowerCase()
        };
        
        let output = mustache.render(template, view);
        fs.writeFileSync(target, output);
    });
}