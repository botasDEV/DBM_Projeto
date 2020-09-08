const fs = require('fs');
const utils = require('../utils');

module.exports = (schemas = [], path) => {
    schemas.forEach(schema => {
        let model = JSON.parse(fs.readFileSync(schema.path));
        let command = 'cd ' + path + ' && ng g component ' + model.title.toLowerCase();
        utils.exec(command);
    });
}