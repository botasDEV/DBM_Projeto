const database = require('../Database/sqlite-wrapper.js')('./Publish/Database/project.db');
const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', ()=> {return faker});

const schemaSong = require('../Schemas/schema-Song.json');

class Song {
    constructor(title,duration,releaseDate,lyrics) {
            this.title = title;
            this.duration = duration;
            this.releaseDate = releaseDate;
            this.lyrics = lyrics;

            Object.defineProperty(this, "id", {enumerable: false, writable: true });
            Object.defineProperty(this, "lyrics", {enumerable: false });
    }

    static create() {
        return Object.assign(new Song(), jsf.generate(schemaSong));
    }

    static create() {
        return Object.assign(new Song(), jsf.generate(schemaSong));
    }

    static all(callback) {
        database.where("SELECT * FROM Song", [], Song, callback);
    }

    save(callback) {
        let query = "";
        let propertiesJoin = "";
        if (this.id) {
            query = "UPDATE Song SET title = ?,duration = ?,releaseDate = ?,lyrics = ? WHERE id = ?";
            propertiesJoin = [this.title,this.duration,this.releaseDate,this.lyrics];
        } else {
            query = "INSERT INTO Song (title,duration,releaseDate,lyrics) VALUES(?,?,?,?)";
            propertiesJoin = [this.title,this.duration,this.releaseDate,this.lyrics];
        }
        
        database.run(query,propertiesJoin,callback);
    }

    static get(id, callback) {
        database.where("SELECT * FROM Song WHERE id = ?", [id], Song, callback)
    }

    static delete(id, callback) {
        database.run("DELETE FROM Song WHERE id = ?", [id], callback)
    }
}

module.exports = Song