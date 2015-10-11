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
app.set('views', __dirname + '/views'); 

var authRequired = function(req,res,next){
	var session = req.session || {}; 
	var auth    = req.session.auth || null; 
	if( ! auth ) 
		return res.send('you are not logged in'); 
	next(); 
}

app.get('/', function(req,res){
	res.render('mainpage');  
}); 

app.get('/login', function(req,res){
	req.session.auth = {userId: 123}; 
	res.redirect('/mainpage'); 
}); 

app.get('/logout', function(req,res){
	req.session.auth = null;  
	res.redirect('/'); 
}); 

app.get('/mainpage', authRequired, function(req,res){
	res.send('mainpage'); 
}); 

var server = app.listen(config.app.port, function(){
    console.log('Polygram is started on a port %d', server.address().port); 
}); 