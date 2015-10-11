var router = require('express').Router();  

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

router.get('/login', function(req,res){
	req.session.auth = {userId: 123}; 
	res.redirect('/mainpage'); 
}); 

router.get('/logout', function(req,res){
	req.session.auth = null;  
	res.redirect('/'); 
}); 

router.get('/mainpage', authRequired, function(req,res){
	res.send('mainpage'); 
});  

module.exports = router; 
