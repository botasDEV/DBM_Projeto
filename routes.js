const fs = require('fs');
const express = require('express');
var router = express.Router();
var app = express();

const serverGenerator = require('./server/server-generator.js');
const classGenerator = require('./models/generate-class.js');
const databaseGenerator = require('./database/generate-database.js');
const apiGenerator = require('./api-restful/generate-api.js');

router.post('/generate', (req, res) => {
    var configs = req.configs;
    try {
         serverGenerator(configs.appServer);
         apiGenerator(configs.schemas);
         let database = new databaseGenerator(configs.database.title);
         
         configs.schemas.forEach(schema => {

            fs.copyFileSync(schema.path, 'Publish/Schemas/'.concat(schema.path.substring(schema.path.lastIndexOf('/'))));
            classGenerator(schema, database.dbName);

            database.createTable(schema);
         });

         database.close();
         res.json('ok');
     }
     catch (e) {
        console.log(e);
        res.statusMessage = e.message;
        res.status(500).end();
     }
});

module.exports = router;
