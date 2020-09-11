const fs = require('fs');
const utils = require('../utils');
const generateDefaultHeaders = require('./generate-default-headers');
const generateHome = require('./generate-frontend-home');
const generateComponents = require('./generate-components');
const generateServices = require('./generate-services');
const generateAppModule = require('./generate-app-module');



module.exports = (configs) => {
    let frontEndConfigs = configs.frontend;
    let schemas = configs.schemas;

    let basePath = './Publish/Frontend/'; 
    let appTitle = (frontEndConfigs.title ? frontEndConfigs.title : 'NG APP' );
    let appFolder = appTitle.replace(' ', '-')
    let appPath = basePath + appTitle.replace(' ', '-').toLowerCase();
    let appPort = frontEndConfigs.port;

    let pathExists = fs.existsSync(appPath);

    if (!pathExists) { 
        fs.mkdirSync(appPath);
    }
    
    console.log('*** STARTING ANGULAR APP ***');
    let command = 'cd ' + basePath + ' && ng new ' + appFolder + ' --skip-install=true --routing'; 
    utils.exec(command);

    console.log('*** App Install Packages ***');
    command = 'cd ' + basePath + appFolder + ' && npm install';
    utils.exec(command);

    
    generateAppModule(schemas, appFolder);
    if (frontEndConfigs.style == 'default') {
        generateDefaultHeaders();
    }
    generateComponents(schemas, appPath);
    generateHome(appFolder); 
    generateServices(configs.appServer, schemas, appPath);
    
    
    if (frontEndConfigs.serve_mode == 'auto') {
        console.log('*** App Building ***');
        command = 'cd ' + basePath + appFolder + ' && ng build';
        utils.exec(command);
        
        console.log('*** App Serving ***');
        command = 'cd ' + basePath + appFolder + ' && ng serve ' + (appPort ? '--port ' + appPort : '' );
        utils.exec(command, false);

        console.log('*** ANGULAR APP SERVED ***');
    } else {
        console.log('*** ANGULAR APP WILL NOT BE SERVED AS REQUESTED ***');
    }
}