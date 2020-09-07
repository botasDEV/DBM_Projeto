const fs = require('fs');
var mustache = require('mustache');

module.exports = (appTitle)=> {
    let template = fs.readFileSync('frontend/index.mustache').toString();
    
    let view = {};
    let partial = {navbar : fs.readFileSync('Publish/Views/navbar.mustache').toString()};
    let output = mustache.render(template, view, partial);
    
    
    fs.writeFileSync('Publish/Frontend/' + appTitle + '/src/app/app.component.html', output);
}