const fs = require('fs');
const utils = require('../utils');

module.exports = (schemas = [], path) => {
    let command = 'cd ' + path + ' && ng g component home';
    utils.exec(command);

    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));
        if (model.show) {
            command = 'cd ' + path + ' && ng g component ' + model.title.toLowerCase();
            utils.exec(command);
        }
    });
}