const mustache = require("mustache");
const references = require("./references");
var sqlite3 = require("sqlite3").verbose();

const classGenerator = require('../models/generate-class.js');
const fs = require("fs");
const constraintsGenerator = require('./constraints');

class Database {
    constructor(dbName) {
        this.dbName = dbName;
        this.sqliteTypes = {
            string: 'TEXT',
            integer: 'INTEGER',
            number: 'REAL',
            date: 'INTEGER',
            blob: 'BLOB'
        };
        Object.defineProperty(this, 'db', {writable: true});
        this.scripts = '';
        this.create();
    }

    create() {
        let databaseClass = this;
        this.db = new sqlite3.Database(this.dbName, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to SQLite Database');
        });
    };

    

    close() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Database connection closed.');
        });
    ;}

    createTable(schema) {
        let constraints = new constraintsGenerator();
        let jsonSchema = JSON.parse(fs.readFileSync(schema.path));
    
        let columns = [];
        Object.keys(jsonSchema.properties).forEach((element, index, aux)=>{
            let dataType = jsonSchema.properties[element].image ? 'blob' : jsonSchema.properties[element].type;
            columns.push({
                name: element,
                type: this.sqliteTypes[dataType],
                required: jsonSchema.required.find((el)=> {
                    return element === el;
                }) ? "NOT NULL" : "NULL",
                unique: jsonSchema.properties[element].unique 
                    ? "UNIQUE" : "",
                constraint: constraints.buildConstraints(jsonSchema.properties[element], element),
                primaryKey: jsonSchema.properties[element].primary_key,
                needComa: (index < aux.length - 1)
            });
        });

        let view = {
            tableName: jsonSchema.title,
            columnsData: columns
        };
    
        var template = fs.readFileSync('database/database.mustache').toString();
        this.scripts += mustache.render(template, view);
    };


    setReferences(schema) {
        let jsonSchema = JSON.parse(fs.readFileSync(schema.path));
        let scripts = '';
        if (jsonSchema.references) {
            jsonSchema.references.forEach((reference)=> {
                let script = references.referenceType(reference.relation).getQuery(jsonSchema.title, reference);
                scripts += script;
            });
        }
        this.scripts += scripts;
    }

    runScripts() {
        this.db.exec(this.scripts);
    }
}

module.exports = Database;

