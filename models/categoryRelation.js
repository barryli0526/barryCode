var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategoryRelationSchema = new Schema({
    category_id: { type: ObjectId ,index: true},
    article_id: { type: ObjectId }
});

mongoose.model('CategoryRelation', CategoryRelationSchema);
