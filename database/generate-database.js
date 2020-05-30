const mustache = require("mustache");
var sqlite3 = require("sqlite3").verbose();
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

        this.create(this.dbName);
    }

    create(dbName) {
        this.db = new sqlite3.Database(dbName, function(err) {
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
        let output = mustache.render(template, view);
        
        this.db.run(output);
    };

}



module.exports = Database;

