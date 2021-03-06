var db      = require('../lib/mysql'); 
var Promise = require('bluebird'); 
var log     = require('../lib/logger'); 

var User = function(){}; 

var createUser = function(data){
    return new Promise(function(res, rej){ 
        
        log.info('creating new user', data.instagram.username); 
        
        db.query('INSERT INTO users SET ? ', {
            instagram_id: data.instagramId
        }, function(err, newRecord){
            if( err ) return rej('db insert error', err); 
            res({
                id         : newRecord.id, 
                instagram  : data.instagram,
                accessToken: data.authToken 
            }); 
        }); 
    }); 
};

var authenticate =  function(response){
    return new Promise(function(resolve, reject){
        db.query('SELECT * FROM users WHERE instagram_id = ?', response.user.id, function(err, data){
            if( err ) return reject(err); 
            log.info('user login ', response.user.username);        
            
            if( data && data.length ) return resolve({
                id         : data[0].id, 
                instagram  : response.user, 
                accessToken: response.access_token
            }); 
            
            log.info('no user detected, will create new one');
            
            createUser({
                    instagramId: response.user.id, 
                    accessToken: response.access_token, 
                    instagram  : response.user
                })
                .then(function(newUser){
                    resolve(newUser); 
                })
                .catch(function(err){
                    log.error(err); 
                    reject(err); 
                }); 
                
        }); 
    }); 
}; 

var saveAccessToken = function(user){
    return new Promise(function(resolve, reject){
        log.info('saving access token for user ', user.instagram.username); 
        db.query('INSERT INTO user_tokens SET ?', {
            user_id: user.id, 
            access_token: user.accessToken
        }, function(err, result){
            if( err ){
                log.error('could not save access token for user ', user.instagram.username); 
                return reject(err);
            } 
            resolve(user); 
        }); 
    }); 
}; 

/*
    instagram response object 
    -access_token 
    -user 
    --id
    --full_name
    --profile_picture
    --website
    --bio
    --username
*/
User.prototype.login = function(response){
    return new Promise(function(resolve, reject){
        authenticate(response)
            .then(saveAccessToken)
            .then(function(user){
                resolve(user); 
            })
            .catch(function(err){
                reject(err); 
            }); 
    })
}


module.exports = new User(); 