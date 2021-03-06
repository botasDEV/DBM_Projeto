const fs = require('fs');
var mustache = require('mustache');

module.exports = (schemasPaths, isBackOffice = false) => {
    let items = [];

    schemasPaths.forEach(schemaPath => {
        var schema = JSON.parse(fs.readFileSync(schemaPath.path));
        let title = schema.title;
        if (isBackOffice || schema.show && !isBackOffice) {
            items.push(
                {
                    href: (isBackOffice ? './' + title : '/' + title.toLowerCase() + '-component'),
                    name: title
                });       
        }
    });

    var template = fs.readFileSync('partial-views/navbar.mustache').toString();
    
    var view = {
        menuItems: items,
        backoffice: isBackOffice
    };

    var output = mustache.render(template, view);
    fs.writeFileSync('Publish/Views/navbar' + (isBackOffice ? '-backoffice' : '') + '.mustache', output);
} 