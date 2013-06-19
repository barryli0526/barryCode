var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  nickname: { type: String, index: true },
  loginname: { type: String, unique: true },
  pass: { type: String },
  email: { type: String, unique: true },
  url: { type: String },
  profile_image_url: {type: String},
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  weibo: { type: String },
  avatar: { type: String },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_login_at: { type: Date, default: Date.now },
  is_star: { type: Boolean },
  level: { type: String },
  active: { type: Boolean, default: true },
  LastLoginIP: { type: String},

  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },
  from_wp: { type: Boolean },

  retrieve_time : {type: Number},
  retrieve_key : {type: String}
});

mongoose.model('User', UserSchema);
