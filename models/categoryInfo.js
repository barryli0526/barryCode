var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategoryInfoSchema = new Schema({
    category_id: { type: ObjectId, index:true},

    article_count:{ type: Number, default:0},
    collect_count:{ type: Number, default:0}
});

mongoose.model('CategoryInfo', CategoryInfoSchema);
