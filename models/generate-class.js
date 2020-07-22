const mustache = require('mustache');
const fs = require('fs');
const utils = require('../utils.js');

module.exports = (schemaPath, dbPath) => {
    var template = fs.readFileSync('models/class.mustache').toString();
    var schema = JSON.parse(fs.readFileSync(schemaPath.path));
    var title = schema.title;
    var required = schema.required;

    var propertiesKeys = Object.keys(schema.properties);
    var arguments = [];
    var argumentsAssigns = [];
    var enumerables = [];
    var propertiesUpdateInsert = [];
    var primaryKey = null;
    var questionMarks = [];
    var refs = [];

    propertiesKeys.forEach((prop, index) => {
        let isPrimaryKey = ('primary_key' in schema.properties[prop] ? schema.properties[prop].primary_key  : false);
        if (isPrimaryKey) primaryKey = prop;

        if (!isPrimaryKey) {
            arguments.push(prop);
            argumentsAssigns.push({'name': prop});
            propertiesUpdateInsert.push({'name': prop, 'comma': (index < propertiesKeys.length -1 ? ',' : '')});
            questionMarks.push({'symbol': '?', 'comma':  (index < propertiesKeys.length -1 ? ',' : '')});
        }

        if (!required.includes(prop)) {
            enumerables.push({'name': prop, 'writable': isPrimaryKey});
        }
    });
    let references = schema.references;
    if (references) {
        references.forEach(ref => {
            refs.push({name: ref.model.toLowerCase()});
        });
    }

    var view = {
        classTitle: title,
        table: title.toLowerCase(),
        dbPath: dbPath,
        constructorArguments: arguments.join(),
        classConstructor: argumentsAssigns,
        classEnumerables: enumerables,
        primaryKey: primaryKey,
        propertiesUpdateJoin: propertiesUpdateInsert,
        propertiesInsertJoin: propertiesUpdateInsert,
        questionMark: questionMarks,
        references: refs
    }

    var output = mustache.render(template, view);
    fs.writeFileSync('Publish/Models/'.concat(title).concat('.js'), output);
}