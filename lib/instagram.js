var request = require('request'); 
var Promise = require('bluebird'); 
var config  = require('../config'); 
var log     = require('./logger'); 
var Instagram = function(settings){
    this.settings = settings; 
}; 

Instagram.prototype.getToken = function(code){
    return new Promise(function(resolve, reject){
            
        request.post('https://api.instagram.com/oauth/access_token', {form: {
            client_id: config.instagram.client_id,  
            client_secret: config.instagram.client_secret,  
            grant_type: 'authorization_code', 
            redirect_uri: 'https://polygram-artsoroka1.c9.io/auth/', 
            code: code 
        }}, function(err, response, body){
            if( err ) {
                log.error('request error', err);
                return reject('could not get access token')
            }
            
            if( response.statusCode != 200) {
                log.error('instagram request status is not 200 OK', body);    
                return reject('failed to get access token'); 
            }
            
            log.info('successfuly authorized with instagram', body); 
            var data; 
            try{
                data = JSON.parse(body); 
            } catch(e){
                log.error('could not parse JSON', body); 
            }
            
            if( ! data ) 
                return reject('JSON parse error'); 
            
            resolve(data); 
            
        }); 
    
    }); 
}; 

module.exports = new Instagram(); 