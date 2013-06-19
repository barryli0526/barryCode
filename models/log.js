var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LogSchema = new Schema({
    log_title : { type: String},
    log_content: { type: String},
    state: { type: Number},
    log_date:{ type: Date, default: Date.now}
});

mongoose.model('Log', LogSchema);
