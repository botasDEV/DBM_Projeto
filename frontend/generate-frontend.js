const fs = require('fs');
const utils = require('../utils');
const generateDefaultHeaders = require('./generate-default-headers');
const generateIndex = require('./generate-frontend-index');
const generateRouting = require('./generate-routing');



module.exports = (configs) => {
    let frontEndConfigs = configs.frontend;
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
    let command = 'cd ' + basePath + ' && ng new ' + appFolder + ' --skip-install=true'; 
    utils.exec(command);

    console.log('*** App Install Packages ***');
    command = 'cd ' + basePath + appFolder + ' && npm install';
    utils.exec(command);

    
    // TODO: Build Components
    generateIndex(appFolder);    
    generateDefaultHeaders();

    generateRouting();

    
    
    
    
    
    
    
    
    
    
    
    console.log('*** App Building ***');
    command = 'cd ' + basePath + appFolder + ' && ng build';
    utils.exec(command);
    
    console.log('*** App Serving ***');
    command = 'cd ' + basePath + appFolder + ' && ng serve ' + (appPort ? '--port ' + appPort : '' );
    utils.exec(command, false);

    console.log('*** ANGULAR APP SERVED ***');

}