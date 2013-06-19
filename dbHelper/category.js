var Category = require('../models').Category;


/*exports.newAndSave = function(parentid,authorid, categoryname,searchname, categorydesc,categoryimg, callback){

    if(typeof(categoryimg) === "function"){
        callback = categoryimg;
        categoryimg = null;
    }
  //  console.log(Category);
    var category = new Category();

    category.category_name = categoryname;
    category.category_searchname = searchname;
    category.category_description = categorydesc;

    if(parentid)
        category.parent_id = parentid;
    if(categoryimg)
        category.category_imgpath = categoryimg;
    if(authorid)
        category.author_id = authorid;

    category.save(callback);
}*/

exports.newAndSave = function( data, callback){
    var category = new Category();

    for(var i in data){
        category[i] = data[i];
    }

    category.save(callback);
}

exports.UpdateCategory = function(userId,categoryId,data, callback){
    Category.findOne({author_id:userId,_id:categoryId}, function(err, category){
        if(err || !category){
            return callback(err, null);
        }else{
            for(var i in data){
                category[i] = data[i];
            }
            category.save(callback);
        }
    })
}

exports.findOneById = function(id, callback){
    Category.findOne({_id:id}, function(err, category){
        if(err || !category){
            return callback(err, null);
        }else{
            return callback(null, category);
        }
    })
}

exports.findOneByQuery = function(query, callback){
    Category.findOne(query, callback);
}

exports.findByParentId = function(parentid, callback){
    Category.find({parent_id:parentid}, function(err, categories){
        if(err || !categories){
            return callback(err, null);
        }else{
            return callback(null, categories);
        }
    })
}

exports.updateCategoryName = function(id, newname, callback){
    Category.findOne({_id:id}, function(err, category){
        if(err || !category){
            return callback(err, null);
        }else{
            category.name = newname;
            category.update_at = Date.now;
            category.save(callback);
        }
    })
}

exports.findByName = function(categoryname, callback){
    Category.find({name:categoryname}, callback);
}


exports.removeByName = function(categoryname, callback){
   Category.findOne({name:categoryname},function(err, category){
       if(err || !category){
           return callback(err, null);
       }else{
           category.remove(callback);
       }
   })
}

exports.removeById = function(id, callback){
    Category.findOne({_id:id},function(err, category){
        if(err || !category){
            return callback(err, null);
        }else{
            category.remove(callback);
        }
    })
}

exports.removeCategoryOfUser = function(userId, categoryId, callback){
    var query = '';
    if(typeof(categoryId) === 'object' && (categoryId instanceof Array)){
        query = {author_id:userId, _id:{$in:categoryId}};
    }else{
        query = {author_id:userId,_id : categoryId};
    }
    Category.remove(query,callback);
}

exports.getAllCategory = function(callback){
	Category.find({},callback);
}

exports.getCategoryByIds = function(ids, pageSize, pageIndex, callback){
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

    Category.find({_id:{$in:ids}},function(err, docs){
        return callback(null, docs);
    });

    /*Category.find({_id:{$in:ids}}).skip(skip)
        .limit(limit)
        .exec(function(err, docs){
            console.log(docs);
            if(err || !docs){
                return callback(err, null);
            }else{
                return callback(null, docs);
            }
        });  */
}

exports.getCategoryByAuthorid = function(authorid, callback){
    Category.find({author_id:authorid},callback);
}