const fs = require('fs');
var mustache = require('mustache');

module.exports = (appTitle)=> {
    let template = fs.readFileSync('frontend/home.mustache').toString();
    
    let view = {};
    let output = mustache.render(template, view);
    
    
    fs.writeFileSync('Publish/Frontend/' + appTitle.replace(" ", "-").toLowerCase() + '/src/app/home/home.component.html', output);
}