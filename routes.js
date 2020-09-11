const fs = require('fs');
const express = require('express');
var router = express.Router();
var app = express();
var multer = require('multer');

const serverGenerator = require('./server/server-generator.js');
const classGenerator = require('./models/generate-class.js');
const databaseGenerator = require('./database/generate-database.js');
const apiGenerator = require('./api-restful/generate-api.js');
const backofficeGenerator = require('./backoffice/generate-backoffice.js');
const partialViewGenerator = require('./partial-views/generate-partial-view.js');
const frontendGenerator = require('./frontend/generate-frontend');


router.post('/generate', (req, res) => {
   var configs = req.configs;
   var serve_mode = req.body.serve_mode;
   var styles = req.body.styles;
   
   if (serve_mode) {
      configs.frontend.serve_mode = serve_mode;
   }

   if (styles) {
      configs.frontend.style = styles;
   }
   
   try {
      serverGenerator(configs.appServer);
      apiGenerator(configs.schemas);
      backofficeGenerator(configs.schemas);
      partialViewGenerator(configs.schemas, true);
      partialViewGenerator(configs.schemas);
      
      let database = new databaseGenerator(configs.database.title);
      
      configs.schemas.forEach(schema => {

         fs.copyFileSync(schema.path, 'Publish/Schemas/'.concat(schema.path.substring(schema.path.lastIndexOf('/'))));
         classGenerator(schema, database.dbName);

         database.createTable(schema);
         database.setReferences(schema);
      });

      database.runScripts();
      
      database.close();


      //frontendGenerator(configs);

      res.json('ok');
   }
   catch (e) {
      console.log(e);
      res.statusMessage = e.message;
      res.status(500).end();
   }
});

module.exports = router;
