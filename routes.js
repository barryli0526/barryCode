var article = require('./controllers/articles');
var category = require('./controllers/category');
var tag = require('./controllers/tag');
var user = require('./controllers/user');
var admin = require('./controllers/admin/admin');
var article_admin = require('./controllers/admin/article');
var category_admin = require('./controllers/admin/category');
var uploader = require('./controllers/upload');
var feed = require('./controllers/feed');
var chat = require('./controllers/chat');
var demoList = require('./controllers/demoList');
var lab = require('./controllers/lab');


var fs = require('fs');
var path = require('path');
var ndir = require('ndir');
var config = require('./config/base').config;


module.exports = function (app, client) {
  // home page
  app.get('/', function(req, res){

      res.render('index');
  })

  app.get('/about', function(req, res){
      res.render('about');
  })

 // app.get('/', article.index);

  app.get('/articles',article.index);
  app.get('/articles/detail/:articleid',article.detail);

  app.get('/category/:categoryid',category.detail);
  
  app.post('/:articleid/comment',article.comment);
  app.post('/:articleid/comment/:commentid',article.comment);

  app.get('/tag/:tagname',tag.detail);

    //login,logout
  app.get('/signin',user.showSignIn);
  app.post('/signin',user.signIn);
  app.get('/signout', user.signOut);
  app.post('/signup', user.signUp);

  //feeds
  app.get('/feeds', feed.index);
  app.get('/getfeed', feed.getFeed);
  app.get('/feeds/get', feed.getDetail);
  app.get('/proxyImg', feed.downLoadImg);

  //admin
  app.get('/admin',admin.Index);

  //article
  app.get('/admin/article/add',article_admin.showAdd);
  app.get('/admin/article/edit',article_admin.showEdit);
  app.get('/admin/article/:articleid/update',article_admin.showUpdte);
  app.post('/admin/article/:articleid/update',article_admin.Update);
  app.get('/admin/article/:articleid/delete',article_admin.DeleteOne);
  app.post('/admin/article/delete',article_admin.Delete);
  app.post('/admin/article/add',article_admin.Add);

  //category
  app.get('/admin/category/add',category_admin.ShowAdd);
  app.get('/admin/category/edit',category_admin.showEdit);

  app.get('/admin/category/:categoryid/update',category_admin.showUpdate);
  app.post('/admin/category/:categoryid/update',category_admin.Update);

  app.get('/admin/category/:categoryid/delete', category_admin.Delete);
  app.post('/admin/category/delete',category_admin.Delete)

  app.post('/admin/category/add',category_admin.Add);

  //demo
  app.get('/demo/list', demoList.Index);



  //upload image

  app.get('/test',function(req, res){
      res.render('test_upload',{
          layout:false
      })
  })

  app.post('/upload/image',uploader.uploadImage);



  //chat
  app.get('/chat', chat.enterroom(client));


      /*function(req, res){

      var room_id = 'room';



      res.render('chatroom/index',{
          layout:false
      })
  }) */

  //lab

  app.get('/lab',lab.index);
  app.get('/lab/:pageid', lab.showPage);
  app.post('/lab/save',lab.save);

  app.get('/lab/:pageid/edit', lab.edit);
  app.post('/lab/create', lab.create);
  app.post('/lab/upload', lab.uploadStaticFiles);
  app.put('/lab/:sid', lab.update);
  app.delete('/lab/resources/:sid', lab.removeResources);
  app.delete('/lab/:sid', lab.removeProject);
 // app.get('/lab/download', lab.download);

};
