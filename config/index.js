module.exports = {
	app: {
		port: process.env.POLYGRAM_PORT || 8080
	},
	session: {
        name: 'polygram', 
        key:  'polygram', 
        cookie: {
            httpOnly: false, 
            secure: false
        },
        secret: 'keyboard cat'
    }
}; 