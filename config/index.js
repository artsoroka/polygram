require('dotenv').load({
    path: __dirname + '/../.env'
}); 

module.exports = {
	app: {
		port: process.env.POLYGRAM_PORT || 8080
	},
	db: {
    	host     : process.env.POLYGRAM_DB_HOST, 
        port     : process.env.POLYGRAM_DB_PORT, 
        user     : process.env.POLYGRAM_DB_USER, 
        password : process.env.POLYGRAM_DB_PSWD,  
        database : process.env.POLYGRAM_DB_NAME
	}, 
	session: {
        name: 'polygram', 
        key:  'polygram', 
        cookie: {
            httpOnly: false, 
            secure: false
        },
        secret: 'keyboard cat'
    },
    logger: {
        papertrail: {
            host: process.env.PAPERTRAIL_HOST, 
            port: process.env.PAPERTRAIL_PORT 
        }
    }, 
    instagram: {
        client_id: process.env.CLIENT_ID, 
        client_secret: process.env.CLIENT_SECRET
    }
}; 