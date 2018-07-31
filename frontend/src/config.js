var config = {
    development: {
        url: 'creditas',
        //mongodb connection settings
        database: {
            host: 'ds159651.mlab.com',
            port: '59651',
            db: 'creditas',
            user: 'creditas',
            pass: 'simple9'
        },
        //server details
        server: {
            host: '0.0.0.0',
            port: '3000'
        }
    }
};
module.exports = config;