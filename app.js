
/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var config = require('./config/base').config;
var routes = require('./routes');
var socket = require('./sockets');
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


var app = express.createServer();

app.configure(function () {
  var viewsRoot = path.join(__dirname, 'views',config.theme);
  app.set('view engine', 'html');
  app.set('views', viewsRoot);
  app.register('.html', require('ejs'));
  app.use(express.bodyParser({
    uploadDir: path.join(__dirname,config.upload_dir)
  }));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.session_secret
  }));

  app.use(express.static(__dirname + '/public'));

  app.use('/upload/', express.static(config.upload_dir, { maxAge: config.image_maxAge }));
  // custom middleware
  app.use(require('./controllers/user').auth_user);

  app.use('/admin/',function(req, res, next){
      if(!req.session.user){
          return res.redirect('/signin');
      }else{
          return next();
      }
  })
});


// routes
routes(app, client);

socket(app, client);

//if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port);

  console.log("NodeClub listening on port %d in %s mode", config.port, app.settings.env);
  console.log("God bless love....");
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
//}

module.exports = app;

/*
 * Catch uncaught exceptions
 */

process.on('uncaughtException', function(err){
    console.log('Exception: ' + err.stack);
});
