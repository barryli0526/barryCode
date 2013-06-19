var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
  author_id: { type: ObjectId , index:true },
  article_path: { type:String },
  summary: { type: String},
  article_title: { type: String},
  article_content: { type: String },
  meta_keywords: { type: String},
  meta_description: { type: String},
  tags:{type: Array},

  top: { type: Boolean, default: false },
  enable_comment: { type: Boolean, default: true},
  content_is_html: { type: Boolean },
  state: { type: Number, default: 0},

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now }
});

mongoose.model('Article', ArticleSchema);
