var router    = require('express').Router();  
var log       = require('../lib/logger'); 
var instagram = require('../lib/instagram'); 
var usr       = require('../models/user'); 
 
var authRequired = function(req,res,next){
	var session = req.session || {}; 
	var auth    = session.auth || null; 
	if( ! auth ) 
		return res.send('you are not logged in'); 
	next(); 
}; 

router.get('/', function(req,res){
	res.render('mainpage');  
}); 

router.get('/auth', function(req,res){
    var code = req.query.code || null; 
    log.info('authentication with instagram, got code %s', code); 
   
   	instagram
   		.getToken(code)
   		.then(usr.login)
   		.then(function(user){
	   	    req.session.auth = {
	            userId     : user.id,  
	            instagram  : user.instagram, 
	            accessToken: user.accessToken
	        }; 
	        
	        res.render('auth/success');
   		})
       	.catch(function(err){ 
        	res.send(err); 
    	}); 

}); 

router.get('/login', function(req,res){
	req.session.auth = {userId: 123}; 
	res.json(req.session); //redirect('/mainpage'); 
}); 

router.get('/logout', function(req,res){
	req.session.auth = null;  
	res.redirect('/'); 
}); 

router.get('/home', authRequired, function(req,res){
	res.render('home', {
	    user: req.session.auth
	}); 
});   

module.exports = router; 
