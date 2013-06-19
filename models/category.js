var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
    parent_id: { type: ObjectId},
    category_name: { type: String},
    category_searchname:{type: String},
    category_description:{ type: String},
    author_id:{type:ObjectId},

    category_imgpath:{ type: String},
    create_at:{ type: Date, default: Date.now},
    update_at:{ type: Date, default: Date.now}
});

mongoose.model('Category', CategorySchema);
