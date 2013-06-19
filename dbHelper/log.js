var Log = require('../models').Log;


exports.newAndSave = function(title, content, state, callback){
    var log = new Log();
    log.log_title = title;
    log.log_content = content;
    log.state = state;

    log.save(callback);
}