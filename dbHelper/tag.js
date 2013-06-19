var Tag = require('../models').Tag;
var models = require('../models');
var Article = models.Article;
var User = require('./user');
var Util = require('../lib/util');
var Comment = require('./comment');
var config = require('../config/base').config;


exports.newAndSave = function(tagName, articleid, callback){
    var tag = new Tag();
    tag.tag_name = tagname;
    tag.article_id = articleid;
    tag.save(callback);
}

exports.getTagsByArticleid = function(articleid, callback){
    Tag.find({article_id:articleid},'tag_name',callback);
}

exports.getArticlesByTagname = function(tagname, callback){
    Tag.find({tag_name:tagname},'article_id',callback);
}

exports.deleteATagOfArticle = function(articleid, tagname, callback){
    Tag.findOne({article_id:articleid, tag_name:tagname},function(err, tag){
        if(err || !tag){
            return callback(err, null);
        }else{
            tag.remove(callback);
        }
    })
}


exports.getTags = function(callback){
    var o = {};
    o.map = function(){
        var arr = [];
        if(typeof(this.tags) === 'string')
           arr =   this.tags.split(',');
        else
            arr = this.tags;

        arr.forEach(function(value){
            emit(value,{count:1});
        })
    }
    o.reduce = function(k, vals){
       var total = 0;
       for ( var i=0; i<vals.length; i++ )
             total += vals[i].count;
        return { count : total };
    }

    Article.mapReduce(o,callback);
}
