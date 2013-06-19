var models = require('../models');
var Article = models.Article;
var User = require('./user');
var Util = require('../lib/util');
var Comment = require('./comment');
var config = require('../config/base').config;


/*query start*/

/**
 * 根据作者ID获取主题列表
 * Callback:
 * - err, 数据库错误
 * - post, 主题
 * - author, 作者
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getArticlesByAuthorId = function(authorId, pageSize, pageIndex, callback){
	
	var listCount = pageSize ? (pageSize) : (config.list_post_count);

    pageIndex = pageIndex > 0 ? (pageIndex): 0;

	Article.find({author_id:authorId})
			.skip(pageIndex*listCount)
			.limit(listCount)
			.exec(function(err, docs){
				if(err){
					return callback(err);
				}
				if(docs.length === 0){
					return callback(null, []);
				}
		
                return callback(null, docs);
            });
}

/**
 * Get All Articles
 * @param pageSize
 * @param pageIndex
 * @param callback
 */
exports.getArticles = function(pageSize, pageIndex, callback){
    var listCount = pageSize ? (pageSize) : (config.list_post_count);

    pageIndex = pageIndex > 0 ? (pageIndex): 0;

    Article.find({})
        .skip(pageIndex*listCount)
        .limit(listCount)
        .exec(function(err, docs){
            if(err){
                return callback(err);
            }
            if(docs.length === 0){
                return callback(null, []);
            }

            return callback(null, docs);
        });
}


/**
 * 获取关键词能搜索到的主题数量
 * Callback:
 * - err, 数据库错误
 * - count, 主题数量
 * @param {String} query 搜索关键词
 * @param {Function} callback 回调函数
 */
exports.getCountByQuery = function (query, callback) {
  Article.count(query, callback);
};


/**
 * 将当前的主题置顶
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.TopArticle = function (id, callback) {
  Article.findOne({_id: id}, function (err, article) {
    if (err) {
      return callback(err);
    }

    if (!article) {
      return callback(new Error('该主题不存在'));
    }

    article.top = true;
    article.save(callback);
  });
};


/**
*  根据一组id获取article
*  callback:
*    -err      错误信息
*    -docs     文章列表
*  @param {Array} ids id列表
*  @param {Int} pageIndex  页码
*  @param {Function} callback 回掉函数
* */
exports.getArticlesByIds = function(ids, pageSize, pageIndex, callback){

    var skip, limit;
    if(typeof(pageSize) === "function"){
        callback = pageSize;
        skip = {};
        limit = {};
    }else{
        var listCount = pageSize ? (pageSize) : (config.list_post_count);
        pageIndex = pageIndex > 0 ? (pageIndex): 0;
        skip = pageIndex*listCount;
        limit = listCount;
    }
    Article.find({_id:{$in:ids}}).skip(skip)
        .limit(limit)
        .exec(function(err, docs){
           if(err || !docs){
               return callback(err, null);
           }else{
               return callback(null, docs);
           }
        });
}

/**
 * 删除一篇文章
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.deleteAArticle = function(id, callback){
	Article.findOne({_id: id}, function(err, article){
		if(err){
			return callback(err);
		}
		if(!article){
			return callback(new Error('该主题不存在'));
		}
        article.remove(callback);
	});
}

/**
 * 通过ID找到文章
 * @param {ObjectId} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.findOneById = function(id, callback){
    exports.findOneByQuerystring({_id : id }, callback);
}


/**
 * 通过查询语句找到微博
 * @param {String} query 查询语句
 * @param {Function} callback 回调函数
 */
exports.findOneByQuerystring = function(query, callback){
	Article.findOne(query, function(err, article){
		if(err){
			return callback(err);
		}

		if(!article){
			return callback(new Error('该主题不存在'));
		}
        return callback(null, article);
	});
}

/**
 *获取最新文章
 * @param {Int} count 条目数
 * @param {Function} callback  回掉函数
 */
exports.findlatestArticles = function(count, callback){
    Article.find({}).sort({date:'desc'}).limit(count).exec(function(err, articles){
        if(err){
            return callback(err);
        }else if(articles.length === 0){
            return callback(null, []);
        }else{
            return callback(null, articles);
        }
    })

}

/**
 * update article
 * @param articleid
 * @param data
 * @param callback
 */
exports.updateArticle = function(articleid, data, callback){
  //  if(Object.keys(data).length == 0)
   //     return callback(null, null);
    Article.findOne({_id:articleid},function(err, article){
        if(err){
            return callback(err,null);
        }

        for(var name in data){
            article[name] = data[name];
        }

        article.update_at =new Date();
        article.save(callback);
    })
}


exports.deleteArticleOfUser = function(articleid, userid, callback){

    Article.remove({_id:articleid,author_id:userid},callback);
}

exports.deleteMultiArticlesOfUser = function(articleIds, userid, callback){
    Article.remove({author_id:userid,_id:{$in:articleIds}}, callback);
}

exports.getArticlesByTag = function(tags, callback){
    Article.find({tags:{$all:tags}}, callback);
 //   Article.find({}, function(err, articles){
     //   console.log(typeof(articles[0].tags)) ;
 //       return callback(err, articles);
 //   });
}



/*exports.newAndSave = function (authorId,title, summary, content,tags,mkeywords,mdesc, callback) {
  var article = new Article();
  article.author_id = authorId;
  article.article_title = title;
  article.summary = summary;
  article.article_content = content;
  article.tags = tags ? tags : '';
  article.meta_keywords = mkeywords ? mkeywords : '';
  article.meta_description = mdesc ? mkeywords : '';
  article.save(callback);
}; */

exports.newAndSave = function(authorId, data, callback){
    var article = new Article();
    article.author_id = authorId;
    for(var i in data){
        article[i] = data[i];
    }
    article.save(callback);
}


exports.deleteAll = function(callback){

    Article.find({}).remove(callback);

}
