var mongoose = require('mongoose');
var config = require('../config/base').config;

mongoose.connect(config.db, function(err){
	if(err){
		console.error('connect to %s error: ', config.db, err.message);
		process.exit(1);
	}
});

require('./article');
require('./articleInfo');
require('./category');
require('./categoryInfo');
require('./categoryRelation');
require('./comment');
require('./commentInfo');
require('./log');
require('./relation');
require('./tag');
require('./user');
require('./userInfo');

exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');
exports.Relation = mongoose.model('Relation');
exports.Comment = mongoose.model('Comment');
exports.ArticleInfo = mongoose.model('ArticleInfo');
exports.Category = mongoose.model('Category');
exports.CategoryInfo = mongoose.model('CategoryInfo');
exports.CategoryRelation = mongoose.model('CategoryRelation');
exports.CommentInfo = mongoose.model('CommentInfo');
exports.Log = mongoose.model('Log');
exports.Tag = mongoose.model('Tag');
exports.UserInfo = mongoose.model('UserInfo');