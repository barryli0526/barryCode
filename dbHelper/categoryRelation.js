var models = require('../models');
var CategoryRelation = models.CategoryRelation;
var config = require('../config/base').config;


/**
 * callback:
 * -err
 * -articlesid 一组articleID
 * @param categoryid
 * @param callback
 */
exports.getArticlesByCategoryId = function(categoryid, pageSize, pageIndex, callback){
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
    skip = {};
    limit = {};
    CategoryRelation.find({category_id:categoryid})
        .skip(skip)
        .limit(limit)
        .exec(function(err, docs){
            if(err){
                return callback(err);
            }
            if(docs.length === 0){
                return callback(null, []);
            }

            var ids = [];
            docs.forEach(function(doc,i){
                ids.push(doc.article_id);
            })
            return callback(err,ids);
        });
}

exports.getCountOfCategory = function(categoryid, callback){
    CategoryRelation.count({category_id:categoryid}, callback);
}


exports.getCategoryByArticleId = function(articleid, callback){
    CategoryRelation.find({article_id:articleid}, function(err, docs){
        var ids = [];
        docs.forEach(function(doc,i){

            ids.push(doc.category_id);
        })

        return callback(err,ids);
    });
}

/**
 * 根据categories数组移除与文章的关联
 * @param articleid
 * @param categories
 * @param callback
 */
exports.removeCategoriesOfArticle = function(articleid, categories, callback){
    CategoryRelation.remove({article_id:articleid, category_id:{$in:categories}},callback);
}


exports.newAndSave = function(articleid, categoryid, callback){
    var categoryRelation = new CategoryRelation();
    categoryRelation.article_id = articleid;
    categoryRelation.category_id = categoryid;
    categoryRelation.save(callback);
}

/**
 *将一篇文章从指定目录中移除
 * @param articleid
 * @param categoryid
 * @param callback
 */
exports.deleteArticleFromCategory = function(articleid, categoryid, callback){
    CategoryRelation.findOne({article_id:articleid, category_id:categoryid},function(err, categoryrelation){
        if(err || !categoryrelation){
            return callback(err, null);
        }else{
            categoryrelation.remove(callback);
        }
    })
}

/**
 *删除目录下的所有文章
 * @param categoryId
 * @param callback
 */
exports.removeAllArticlesOfCategory = function(categoryId, callback){
    var query = '';
    if(typeof(categoryId) === 'object' && (categoryId instanceof Array)){
        query = {category_id:{$in:categoryId}};
    }else{
        query = {category_id : categoryId};
    }
    CategoryRelation.remove(query,callback);
}