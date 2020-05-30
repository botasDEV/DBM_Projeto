const database = require('../Database/sqlite-wrapper.js')('./Publish/Database/project.db');
const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', ()=> {return faker});

const schemaAlbum = require('../Schemas/schema-Album.json');

class Album {
    constructor(title,cover,price,releaseDate) {
            this.title = title;
            this.cover = cover;
            this.price = price;
            this.releaseDate = releaseDate;

            Object.defineProperty(this, "id", {enumerable: false, writable: true });
    }

    static create() {
        return Object.assign(new Album(), jsf.generate(schemaAlbum));
    }

    static create() {
        return Object.assign(new Album(), jsf.generate(schemaAlbum));
    }

    static all(callback) {
        database.where("SELECT * FROM Album", [], Album, callback);
    }

    save(callback) {
        let query = "";
        let propertiesJoin = "";
        if (this.id) {
            query = "UPDATE Album SET title = ?,cover = ?,price = ?,releaseDate = ? WHERE id = ?";
            propertiesJoin = [this.title,this.cover,this.price,this.releaseDate];
        } else {
            query = "INSERT INTO Album (title,cover,price,releaseDate) VALUES(?,?,?,?)";
            propertiesJoin = [this.title,this.cover,this.price,this.releaseDate];
        }
        
        database.run(query,propertiesJoin,callback);
    }

    static get(id, callback) {
        database.where("SELECT * FROM Album WHERE id = ?", [id], Album, callback)
    }

    static delete(id, callback) {
        database.run("DELETE FROM Album WHERE id = ?", [id], callback)
    }
}

module.exports = Album