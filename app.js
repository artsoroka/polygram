var express    	 = require('express');
var session    	 = require('express-session'); 
var bodyParser 	 = require('body-parser');  
var cookieParser = require('cookie-parser');  
var app        	 = express(); 
var config	     = require('./config'); 

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(session(config.session))

app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs'); 

app.get('/', function(req,res){
	res.send('hello Polygram'); 
}); 

app.listen(config.app.port, function(){
    console.log('Photorama is started on a port %d', config.app.port); 
}); 