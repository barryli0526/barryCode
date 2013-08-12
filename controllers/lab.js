var fs = require('fs');
    path = require('path'),
    ndir = require('ndir'),
    config = require('../config/base').config,
    EventProxy = require('EventProxy'),
    jsdom   = require('jsdom'),
    et = require('elementtree'),
    labService = require('../service/LabService');


exports.index = function(req, res, next){

    //  parser.ParseRequest(function(err, docs){
    //      res.render('feeds/index',{
    //          feeds:docs
    //      })
    //  })

    res.render('lab/runjs',{
        layout:null
    });

}

exports.save =  function(req, res, next){

    if(!req.session.user){
        return res.render('sign/signin',{layout:null});
    }

    var data = req.body;
   // console.log(data);
   // res.end('success')

    var uname = req.session.user.loginname.toString();
    var userDir = path.join(config.lab_content_idr, uname,data.id);

    ndir.mkdir(userDir, function (err) {
        if (err) {

            return next(err);
        }


      //  var filename = data.id+'.html';
        var savepath = path.resolve(path.join(userDir, 'index.html'));
        if (savepath.indexOf(path.resolve(userDir)) !== 0) {
            return res.send({status: 'forbidden'});
        }

        fs.writeFile(savepath, data.content, function(err){
            if(err) {
                console.log(err);
            } else {

                var content = {};
                content.html = data.html;
                content.js = data.js;
                content.css = data.css;
                content.sid = data.id;

                labService.updateProduct(content.sid, content, function(err, doc){
                    if(err || !doc){
                        console.log('add new lab product failed');
                    }else{

                    }
                })

                res.end(data.id);
            }

        })


    });

}


exports.showPage = function(req, res){

   if(!req.session.user){
       return res.render('sign/signin',{layout:null});
   }

   var uname = req.session.user.loginname.toString();

   var pageid = req.params.pageid;
   var realPath = 'public/user_data/lab/'+uname+'/'+pageid+'/index.html';
   // var realPath = 'public/user_data/lab/abc/1375863959212_123.html';

    fs.stat(realPath, function(err, stats){
        if(err){
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write("This request URL " + pageid + " was not found on this server.");
            res.end();
        }else{
            res.setHeader("Content-Type", 'text/html');
            res.setHeader('Content-Length', stats.size);

            var lastModified = stats.mtime.toUTCString();
            var ifModifiedSince = "If-Modified-Since".toLowerCase();
            res.setHeader("Last-Modified", lastModified);

            var expires = new Date();
            expires.setTime(expires.getTime() + config.lab_maxAge * 1000);
            res.setHeader("Expires", expires.toUTCString());
            res.setHeader("Cache-Control", "max-age=" + config.lab_maxAge);

            if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {
                res.writeHead(304, "Not Modified");
                res.end();
            }else{
                res.writeHead(200);
                fs.createReadStream(realPath).pipe(res);
            }
        }

    })
}


exports.edit = function(req, res){

    if(!req.session.user){
        return res.render('sign/signin',{layout:null});
    }

    var uname = req.session.user.loginname.toString();

    var pageid = req.params.pageid;
    var realPath = 'public/user_data/lab/'+uname+'/'+pageid+'/index.html';

    console.log(pageid);

    labService.getProductBySid(pageid, function(err, doc){

        console.log(doc);
        res.render('lab/runjs',{
            content:doc[0],
            layout:null
        })
    })

}

exports.create = function(req, res){

    if(!req.session.user){
        return res.render('sign/signin',{layout:null});
    }

    var content = req.body;

    console.log('aaaaaa');

    labService.CreateProduct(req.session.user._id, content, function(err, doc){
        if(err || !doc){
            console.log('add new lab product failed');
            res.end('fail');
        }else{
            console.log('add new lab product success');
            res.end('success');
        }
    })
}