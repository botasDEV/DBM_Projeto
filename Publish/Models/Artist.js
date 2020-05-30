const database = require('../Database/sqlite-wrapper.js')('./Publish/Database/project.db');
const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', ()=> {return faker});

const schemaArtist = require('../Schemas/schema-Artist.json');

class Artist {
    constructor(name,birthdate,dateDeath) {
            this.name = name;
            this.birthdate = birthdate;
            this.dateDeath = dateDeath;

            Object.defineProperty(this, "id", {enumerable: false, writable: true });
            Object.defineProperty(this, "dateDeath", {enumerable: false });
    }

    static create() {
        return Object.assign(new Artist(), jsf.generate(schemaArtist));
    }

    static create() {
        return Object.assign(new Artist(), jsf.generate(schemaArtist));
    }

    static all(callback) {
        database.where("SELECT * FROM Artist", [], Artist, callback);
    }

    save(callback) {
        let query = "";
        let propertiesJoin = "";
        if (this.id) {
            query = "UPDATE Artist SET name = ?,birthdate = ?,dateDeath = ? WHERE id = ?";
            propertiesJoin = [this.name,this.birthdate,this.dateDeath];
        } else {
            query = "INSERT INTO Artist (name,birthdate,dateDeath) VALUES(?,?,?)";
            propertiesJoin = [this.name,this.birthdate,this.dateDeath];
        }
        
        database.run(query,propertiesJoin,callback);
    }

    static get(id, callback) {
        database.where("SELECT * FROM Artist WHERE id = ?", [id], Artist, callback)
    }

    static delete(id, callback) {
        database.run("DELETE FROM Artist WHERE id = ?", [id], callback)
    }
}

module.exports = Artist