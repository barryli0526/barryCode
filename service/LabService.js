var ObjectId = require('mongoose').Types.ObjectId;
var dbHelper = require('../dbHelper');
var labProduct = dbHelper.LabProduct;
var User = dbHelper.User;
var util = require('../lib/util');
var EventProxy = require('EventProxy');



exports.CreateProduct = function(authorid, data, callback){
    if(typeof(authorid) === "string"){
        authorid =  new ObjectId(authorid);
    }

    labProduct.newAndSave(authorid, data, function(err, doc){
        if(err || !doc){
            return callback(err, null);
        }

        return callback(null, doc);
    })

}

exports.getProductBySid = function(sid, callback){
    labProduct.getBySid(sid, callback);
}

exports.updateProduct = function(sid, data, callback){
    labProduct.updateProduct(sid, data, callback);
}

