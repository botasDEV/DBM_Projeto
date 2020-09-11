const fs = require('fs');
const utils = require('../utils');
const mustache = require('mustache');

module.exports = (schemas = [], path) => {
    let command = 'cd ' + path + ' && ng g component home';
    utils.exec(command);

    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));

        if (model.show) {
            command = 'cd ' + path + ' && ng g component ' + model.title.toLowerCase();
            utils.exec(command);

            let keys = Object.keys(model.properties);
            let titleLowerCase = model.title.toLowerCase();
            let templateTemplate = fs.readFileSync('frontend/component-template.mustache').toString();
            let templateScript = fs.readFileSync('frontend/component-script.mustache').toString();
            let targetTemplate = path + '/src/app/' + titleLowerCase + '/' + titleLowerCase + '.component.html';
            let targetScript = path + '/src/app/' + titleLowerCase + '/' + titleLowerCase + '.component.ts';
            let title = null;
            let image = null;


            keys.forEach(key => {
                if (model.properties[key].title) {
                    title = key;
                }
                
                if (model.properties[key].image) {
                    image = '<img class="card-img-top" src="{{elem.' + key + '}}" alt="{{elem.' + key + '}}">';
                }
                
            });
            
            let view = {
                image: image,
                title: title
            };

            let output = mustache.render(templateTemplate, view);
            fs.writeFileSync(targetTemplate, output);

            view = {
                title: model.title,
                titleLowCase: model.title.toLowerCase()
            };

            output = mustache.render(templateScript, view);
            fs.writeFileSync(targetScript, output);
        }
    });
}