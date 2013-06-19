var models = require('../models');
var Relation = models.Relation;

/**
 * 查找关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 * @param callback
 */
exports.getRelation = function (userId, followId, callback) {
  Relation.findOne({user_id: userId, follow_id: followId}, callback);
};

/**
 * 根据用户查找用户的所有偶像们
 * @param {ID} followId 关注人的id
 * @param callback
 */
exports.getAllFollowers = function (followId, callback) {
  Relation.find({follow_id: followId}, callback);
};

/**
 * 根据用户查找用户的偶像们，分页
 * @param {ID} followId 关注人的id
 * @param callback
 */
exports.getFollowers = function (followId, pageSize, pageIndex, callback) {
    Relation.find({follow_id: followId}).skip(pageSize*pageIndex).limit(pageSize)
        .exec(function(err, docs){
            if(err || !docs){
                return callback(err, null);
            }else{
                return callback(null, docs);
            }
        });
};

/**
 * 根据用户查找粉丝们
 * @param {ID} userId 被关注人的id
 * @param callback
 */
exports.getFollowings = function (userId, pageSize, pageIndex, callback) {
  Relation.find({user_id: userId}).skip(pageSize*pageIndex).limit(pageSize)
    .exec(function(err, docs){
        if(err || !docs){
            return callback(err, null);
        }else{
            return callback(null, docs);
        }
    });
};

/**
 * 根据用户查找所有粉丝们
 * @param {ID} userId 被关注人的id
 * @param callback
 */
exports.getAllFollowings = function (userId, callback) {
    Relation.find({user_id: userId}, callback);
};

/**
 * 创建新的关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 * @param callback
 */
exports.newAndSave = function (userId, followId, callback) {
  var relation = new Relation();
  relation.user_id = userId;
  relation.follow_id = followId;
  relation.save(callback);
};

/**
 * 删除的关注关系
 * @param {ID} userId 被关注人的id
 * @param {ID} followId 关注人的id
 * @param callback
 */
exports.remove = function (userId, followId, callback) {
  Relation.remove({user_id: userId, follow_id: followId}, callback);
};
