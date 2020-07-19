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
                originalPath: 'database/sqlite-wrapper.js',
                destinationPath: 'Publish/Database/sqlite-wrapper.js'
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
