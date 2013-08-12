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


