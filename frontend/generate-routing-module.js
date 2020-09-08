const fs = require('fs');
var mustache = require('mustache');

module.exports = (schemas = []) => {
    let template = fs.readFileSync('frontend/app-routing-module.mustache').toString();
    let target = 'Publish/Frontend/movies-ng/src/app/app-routing.module.ts';
    
    let imports = [];
    let routes = [];
    
    
    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));
        let title = model.title;
        imports.push({import: 'import { ' + title + 'Component } from "./' + title.toLowerCase() + '/' + title.toLowerCase() + '.component";'});
        routes.push({route: '{ path: "' + title.toLowerCase() + '-component", component: ' + title + 'Component }'});
    });
    
    let view = {
        imports: imports,
        routes: routes
    };

    var output = mustache.render(template, view);
    fs.writeFileSync(target, output);
}