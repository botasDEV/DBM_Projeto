const fs = require('fs');
var mustache = require('mustache');

module.exports = () => {
    let template = fs.readFileSync('Publish/Frontend/movies-ng/src/app/app.module.ts').toString();
    let target = 'Publish/Frontend/movies-ng/src/app/app.module.ts';
    
    let imports = [
        'import { Routes, RouterModule } from "@angular/router";'
    ];
    

}