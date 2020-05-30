const database = require('../Database/sqlite-wrapper.js')('./Publish/Database/project.db');
const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', ()=> {return faker});

const schemaGenre = require('../Schemas/schema-Genre.json');

class Genre {
    constructor(name) {
            this.name = name;

            Object.defineProperty(this, "id", {enumerable: false, writable: true });
    }

    static create() {
        return Object.assign(new Genre(), jsf.generate(schemaGenre));
    }

    static create() {
        return Object.assign(new Genre(), jsf.generate(schemaGenre));
    }

    static all(callback) {
        database.where("SELECT * FROM Genre", [], Genre, callback);
    }

    save(callback) {
        let query = "";
        let propertiesJoin = "";
        if (this.id) {
            query = "UPDATE Genre SET name = ? WHERE id = ?";
            propertiesJoin = [this.name];
        } else {
            query = "INSERT INTO Genre (name) VALUES(?)";
            propertiesJoin = [this.name];
        }
        
        database.run(query,propertiesJoin,callback);
    }

    static get(id, callback) {
        database.where("SELECT * FROM Genre WHERE id = ?", [id], Genre, callback)
    }

    static delete(id, callback) {
        database.run("DELETE FROM Genre WHERE id = ?", [id], callback)
    }
}

module.exports = Genre