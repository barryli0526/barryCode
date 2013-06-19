var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleInfoSchema = new Schema({
    article_id:{ type: ObjectId },
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    up_count: { type: Number, default: 0 },
    down_count: { type: Number, default: 0 }
});

mongoose.model('ArticleInfo', ArticleInfoSchema);
