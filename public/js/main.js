var Polygram = {
    baseUrl: 'https://api.instagram.com/oauth/authorize/', 
    config: {
        client_id: 'f23d995ea49543328af06d1330b14beb', 
        redirect_uri: encodeURI('https://polygram-artsoroka1.c9.io/auth/'),
        response_type: 'code'
    }, 
    redirect: function(){
        window.location = '/home'; 
    },
    
    login: function(){
        var url  = this.generateUrl(); 
        var self = this; 
        var loginWindow = window.open(url, "authentication", "width=800, height=450"); 
        
        var intervalId = setInterval(function() {
            if (loginWindow.closed) {
                clearInterval(intervalId);
                self.redirect(); 
            }
        }, 1000);
        
    }, 
    generateUrl: function(){
        var params = []; 
        for(var property in this.config){
            params.push( [property, this.config[property]].join('=') );
        }
        
        return [this.baseUrl, params.join('&')].join('?'); 
    }
    
}; 



