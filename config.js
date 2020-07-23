module.exports =  {
    port: 8182,
    host: '0.0.0.0',
    basePath: 'Publish',
    appServer: {
        port: 8183,
        host: '0.0.0.0',
        target: 'Publish/server.js',
        staticFiles: [
            {
                originalPath: 'utils.js',
                destinationPath: 'Publish/utils.js'
            },
            {
                originalPath: 'style',
                destinationPath: 'Publish/Public/Css'
            },
            {
                originalPath: 'images',
                destinationPath: 'Publish/Public/Images'
            },
            {
                originalPath: 'database/sqlite-wrapper.js',
                destinationPath: 'Publish/Database/sqlite-wrapper.js'
            },
            {
                originalPath: 'backoffice/list.mustache',
                destinationPath: 'Publish/Views/list.mustache'
            },
            {
                originalPath: 'backoffice/details.mustache',
                destinationPath: 'Publish/Views/details.mustache'
            }
        ]
    },
    schemas : [
        { path: './schemas/schema-Actor.json'},
        { path: './schemas/schema-Director.json'},
        { path: './schemas/schema-Genre.json'},
        { path: './schemas/schema-Movie.json'}
    ],
    database: {
        title: './Publish/Database/project.db'
    },
    
};
