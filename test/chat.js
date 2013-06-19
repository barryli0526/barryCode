var redis = require('redis');
//var ejsfilter = require('./lib/ejs_filter');

/**
 *   Instantiate redis
 */


var client = null;

if(process.env.REDISTOGO_URL){
    var rtg   = require('url').parse(process.env.REDISTOGO_URL);
    client = exports.client  = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(':')[1]); // auth 1st part is username and 2nd is password separated by ":"
}else{
    client = exports.client  = redis.createClient();
}

//add this for test
client.flushdb();


client.sadd('test','newtest',function(err,status){
    console.log('add'+status);

    client.sadd('test','newtest',function(err,status){
        console.log('add'+status);
    });

})