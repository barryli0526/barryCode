var models = require('../models');
var Category = models.Category;
var CategoryInfo = models.CategoryInfo;

/*
 * 添加计数
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {ObjectId} userid 用户id
 * @param {String} typeName 如：post_count/reply_count/follower_count/following_count/collect_tag_count/collect_article_count
 * @param {Function} callback 回调函数
 * */

var addCount = function(categoryid, typeName, callback){
    CategoryInfo.findOne({category_id: categoryid}, function(err, categoryInfo){
        if(err){
            return callback(err, null);
        }else if(!categoryInfo){
            Category.findOnebyid(categoryid, function(err, category){
                if(err || !category){
                    return callback(err, null);
                }else{
                    var categoryInfo = new CategoryInfo();
                    categoryInfo.category_id = categoryid;
                    categoryInfo[typeName] = 1;
                    categoryInfo.save(callback);
                }

            })
        }else{
            categoryInfo[typeName] += 1;
            categoryInfo.save(callback);
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
var deleteCount = function(categoryid, typeName, callback){
    CategoryInfo.findOne({category_id:categoryid}, function(err, categoryinfo){
        if(err || !categoryinfo){
            return callback(err, null);
        }else{
            categoryinfo[typeName] -= 1;
            categoryinfo.save(callback);
        }
    })
}


/*
 * 以下6个函数分别为添加相应的计数函数
 * */

exports.addArticleCount = function(categoryid, callback){
    addCount(categoryid,"article_count",callback);
}

exports.addCollectCount = function(categoryid, callback){
    addCount(categoryid,"collect_count",callback);
}

/*
 * 以下6个函数分别为减少相应的计数函数
 * */

exports.deleteArticleCount = function(categoryid, callback){
    deleteCount(categoryid,"article_count",callback);
}

exports.deleteCollectCount = function(categoryid, callback){
    deleteCount(categoryid,"collect_count",callback);
}


exports.getCategoryInfoByCategoryId = function(categoryId, callback){
    CategoryInfo.findOne({category_id:categoryId},callback);
}

exports.removeCategoryInfo = function(categoryId, callback){
    var query = '';
    if(typeof(categoryId) === 'object' && (categoryId instanceof Array)){
        query = {category_id:{$in:categoryId}};
    }else{
        query = {category_id : categoryId};
    }

    CategoryInfo.remove(query,callback);
}

exports.newAndSave = function(categoryid, callback){
    var categoryinfo = new CategoryInfo();
    categoryinfo.category_id = categoryid;
    categoryinfo.save(callback);
}

