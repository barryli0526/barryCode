var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;

exports.format_date = function (date, friendly) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (friendly) {
    var now = new Date();
    var mseconds = -(date.getTime() - now.getTime());
    var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' ??';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' ???';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' ???';
      }
    }
  }

  //month = ((month < 10) ? '0' : '') + month;
  //day = ((day < 10) ? '0' : '') + day;
  hour = ((hour < 10) ? '0' : '') + hour;
  minute = ((minute < 10) ? '0' : '') + minute;
  second = ((second < 10) ? '0': '') + second;

 // var thisYear = new Date().getFullYear();
  //year = (thisYear === year) ? '' : (year + '-');
    year =  year + '-';
  return year + month + '-' + day + ' ' + hour + ':' + minute;
};


/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html) {
    return String(html)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};


exports.transformToJSON = function(filedname, value){

    var fileds = filedname.split(',');
    var values = value.split(',');

    var len = fileds.length > values.length ? (values.length) : (fileds.length);

    var jsonstr = '{';

    for(var i=0;i<len;i++){
        if(i > 0)
            jsonstr += ',';
        jsonstr += '"' + fileds[i] + '":"' + values[i] +'"';
    }
    jsonstr += '}';

    try{
        return JSON.parse(jsonstr);
    }catch(e){
        return jsonstr;
    }

}

exports.encrypt = function(str, secret){
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

exports.decrypt = function(str, secret){
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

exports.transToArray = function(str){
    if(typeof(str) === 'string')
        return str.split(',');
    return str;
}

exports.transToObjectId = function(param){
    if(!param){
        return null;
    }
    if(typeof(param) === 'string')
        return new ObjectId(param);
    else if(param instanceof Array){
        var arr = new Array();
        param.forEach(function(id,i){
            if(typeof(id) === 'string'){
                arr[i] = new ObjectId(id);
            }else{
                arr[i] = id;
            }
        })
        return arr;
    }
    return param;
}

exports.isImage = function(str){
    var ext = str.split('.');
    ext = ext[ext.length-1];
    return /^(jpg|png|jpeg|gif)$/i.test(ext);
}


exports.parseCookie = function(cookie){
    var cookies = {};
    cookie.split(';').forEach(function(cookie){
        var parts = cookie.split('=');
        cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    return cookies;
}