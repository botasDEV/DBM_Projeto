const fs = require('fs');
var mustache = require('mustache');

module.exports = (schemas= [], appFolder) => {
    let template = fs.readFileSync('frontend/app-module.mustache').toString();
    let target = 'Publish/Frontend/' + appFolder + '/src/app/app.module.ts';
    
    let imports = [];
    let includes = [];
    let routes = [];

    includes.push({import: 'import { HomeComponent } from "./home/home.component";'});
    includes.push({include: "import { HttpClientModule } from '@angular/common/http';"});
    imports.push({import: "HttpClientModule"});
    
    
    
    
    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));
        let title = model.title;
        if (model.show) {
            includes.push({import: 'import { ' + title + 'Component } from "./' + title.toLowerCase() + '/' + title.toLowerCase() + '.component";'});
            routes.push({route: '{ path: "' + title.toLowerCase() + '-component", component: ' + title + 'Component }'});
        }
    });

    routes.push({route: '{ path: "**", component: HomeComponent }'});

    let view = {
        imports: imports,
        includes: includes,
        routes: routes
    };

    var output = mustache.render(template, view);
    fs.writeFileSync(target, output);

    // Generate main page to where all the others will navigate
    let partials = {navbar: fs.readFileSync('Publish/Views/navbar.mustache').toString()};
    template = fs.readFileSync('frontend/index.mustache').toString();
    view = {};
    output = mustache.render(template, view, partials);
    
    
    fs.writeFileSync('Publish/Frontend/' + appFolder.toLowerCase() + '/src/app/app.component.html', output);
}