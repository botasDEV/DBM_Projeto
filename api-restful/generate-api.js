const fs = require('fs');
var mustache = require('mustache');

module.exports = (schemasPaths) => {
    let schemas = [];
    schemasPaths.forEach(schemaPath => {
        var schema = JSON.parse(fs.readFileSync(schemaPath.path));
        schemas.push({title: schema.title});
    });

    var template = fs.readFileSync('api-restful/api.mustache').toString();
    
    var view = {
        schemas: schemas
    };

    var output = mustache.render(template, view);
    fs.writeFileSync('Publish/Controllers/api.js', output);
} 