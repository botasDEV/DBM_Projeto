const mkdirp = require('mkdirp');
const del = require('del');


module.exports = (basePath = '') => {
    if (!basePath) {
        throw 'The directories need a base path to be created';
    }

    if (basePath.indexOf('/') === -1 || basePath.indexOf('/') !== basePath.length - 1){
        basePath = basePath.concat('/');
    }


    del.sync([basePath.concat('**'), '!'.concat(basePath)]);

    mkdirp.sync(basePath.concat('Controllers'));
    mkdirp.sync(basePath.concat('Models'));
    mkdirp.sync(basePath.concat('Public/Css'));
    mkdirp.sync(basePath.concat('Public/Images'));
    mkdirp.sync(basePath.concat('Public/Js'));
    mkdirp.sync(basePath.concat('Views'));
    mkdirp.sync(basePath.concat('Schemas'));
    mkdirp.sync(basePath.concat('Database'));

}