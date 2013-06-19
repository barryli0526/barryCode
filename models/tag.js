var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    tag_name: { type: String},
    article_id:{type: ObjectId}
});

mongoose.model('Tag', TagSchema);
