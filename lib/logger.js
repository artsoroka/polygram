var config  = require('../config'); 
var winston = require('winston');
require('winston-papertrail').Papertrail; 

var logger; 
var transports = [
    new winston.transports.Console({
        colorize: true
    })
];  

var pt = new winston.transports.Papertrail({
    host: config.logger.papertrail.host,
    port: config.logger.papertrail.port, 
    program: 'polygram', 
    colorize: true
});  
 
pt.on('error', function(e){
    console.log('papertail error', e); 
}); 
 
transports.push(pt); 
logger = new winston.Logger({transports: transports}); 

module.exports = logger; 