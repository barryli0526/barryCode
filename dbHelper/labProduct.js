var models = require('../models');
var labProduct = models.LabProduct;
var User = require('./user');
var Util = require('../lib/util');
var config = require('../config/base').config;


/*query start*/

exports.newAndSave = function(authorId, data, callback){
    var labPro = new labProduct();
    labPro.author_id = authorId;
    for(var i in data){
        labPro[i] = data[i];
    }
    labPro.save(callback);
}

exports.getBySid = function(sid, callback){
    labProduct.find({sid:sid}, callback);
}

exports.updateProduct = function(sid, data, callback){
    labProduct.findOne({sid:sid},function(err, product){
        if(err || !product){
            return callback(err,null);
        }

        for(var name in data){
            product[name] = data[name];
        }

        product.update_at =new Date();
        product.save(callback);
    })
}


exports.deleteAll = function(callback){

    labProduct.find({}).remove(callback);

}

exports.getProductsByAuthorId = function(authorId, callback){
    labProduct.find({author_id:authorId},'sid name', callback);
}

exports.AddResources = function(sid, resources, callback){
    labProduct.findOneAndUpdate({sid:sid},{'$pushAll':resources}, function(err, doc){
        if(err)
            return callback(err);
        return callback(err, doc);
    })
}

exports.removeProductBySid = function(sid, callback){
    labProduct.find({sid:sid}).remove(callback);
}

exports.removeAllResources = function(sid, callback){
    labProduct.findOne({sid:sid}, function(err, doc){
        doc.resources = [];
        doc.save();
        return callback(err);
    })
}

exports.removeResources = function(sid, resources, callback){
    labProduct.findOneAndUpdate({sid:sid},{'$pullAll':resources}, function(err, doc){
        if(err)
            return callback(err);
        return callback(err, doc);
    });
}


