var models = require('../models');
var ArticleInfo = models.ArticleInfo;
var Article = models.Article;



/*
 * 添加计数
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {ObjectId} userid 用户id
 * @param {String} typeName 如：post_count/reply_count/follower_count/following_count/collect_tag_count/collect_article_count
 * @param {Function} callback 回调函数
 * */

var addCount = function(articleid, typeName, callback){
    ArticleInfo.findOne({article_id: articleid}, function(err, articleinfo){
        if(err){
            return callback(err, null);
        }else if(!articleinfo){
            Article.findOnebyid(articleid, function(err, article){
                if(err || !article){
                    return callback(err, null);
                }else{
                    var articleinfo = new ArticleInfo();
                    articleinfo.article_id = articleid;
                    articleinfo[typeName] = 1;
                    articleinfo.save(callback);
                }

            })
        }else{
            articleinfo[typeName] += 1;
            articleinfo.save(callback);
        }
    })
}

/*
 * 减少计数
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {ObjectId} userid 用户id
 * @param {String} typeName 如：post_count/reply_count/follower_count/following_count/collect_tag_count/collect_article_count
 * @param {Function} callback 回调函数
 * */
var deleteCount = function(articleid, typeName, callback){
    ArticleInfo.findOne({article_id:articleid}, function(err, articleinfo){
        if(err || !articleinfo){
            return callback(err, null);
        }else{
            articleinfo[typeName] -= 1;
            articleinfo.save(callback);
        }
    })
}


/*
 * 以下6个函数分别为添加相应的计数函数
 * */
exports.addVisitCount = function(articleid, callback){
    addCount(articleid,"visit_count",callback);
}

exports.addReplyCount = function(articleid, callback){
    addCount(articleid,"reply_count",callback);
}

exports.addCollectCount = function(articleid, callback){
    addCount(articleid,"collect_count",callback);
}

exports.addUpCount = function(articleid, callback){
    addCount(articleid,"up_count",callback);
}

exports.addDownCount = function(articleid, callback){
    addCount(articleid,"down_count",callback);
}

/*
 * 以下6个函数分别为减少相应的计数函数
 * */
exports.deleteVisitCount = function(articleid, callback){
    deleteCount(articleid,"visit_count",callback);
}

exports.deleteReplyCount = function(articleid, callback){
    deleteCount(articleid,"reply_count",callback);
}

exports.deleteCollectCount = function(articleid, callback){
    deleteCount(articleid,"collect_count",callback);
}

exports.deleteUpCount = function(articleid, callback){
    deleteCount(articleid,"up_count",callback);
}

exports.deleteDownCount = function(articleid, callback){
    deleteCount(articleid,"down_count",callback);
}

exports.getArticleInfoById = function(articleid, callback){
    ArticleInfo.findOne({article_id:articleid}, callback);
}

exports.getArticlesSortByReply = function(count, callback){
    ArticleInfo.find({}).sort({reply_count:'desc'}).limit(count).exec(callback);
}

exports.removeInfoByArticleId = function(articleid, callback){
    ArticleInfo.remove({article_id:articleid}, callback);
}

exports.removeMultiInfo = function(articleIds, callback){
    ArticleInfo.remove({article_id:{$in:articleIds}}, callback);
}


exports.newAndSave = function(articleid, callback){
    ArticleInfo.findOne({article_id: articleid},function(err, articleInfo){
        if(err){
            return callback(err, null);
        }else if(articleInfo){
            return callback(null,articleInfo,"用户信息已经存在");
        }else{
            var articleInfo = new ArticleInfo();
            articleInfo.article_id = articleid;
            articleInfo.save(callback);
        }
    })
}