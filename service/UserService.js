var dbHelper = require('../dbHelper');
var User = dbHelper.User;
var UserInfo = dbHelper.UserInfo;
var Message = require('../config/message').Message;
var labels = require('../config/labels').labels;
var EventProxy = require('eventproxy');
var util = require('../lib/util');


/**
 * user sign in
 * @param loginname
 * @param pass
 * @param callback
 * @constructor
 */
exports.SignIn = function(loginname, pass, callback){
    User.getUserByLoginInfo(loginname, pass, function(err, user){

        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null,null,Message.User.signin_error);
        }

        //不处理更新成功或失败
        User.UpdateLoginTime(user);

        //直接返回信息,不需要等待更新完成
        return callback(null, user);
    })
}

/**
 * get user profile through provided loginname
 * @param loginname
 * @param callback
 */
exports.getUserProfile = function(loginname, callback){
    User.getUserByLoginName(loginname, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null,null,Message.User.not_exsits);
        }

        return callback(null, user);
    })
}

/**
 * update user profile
 * @param loginname
 * @param data
 * @param callback
 * @returns {*}
 * @constructor
 */
exports.UpdateUserProfile = function(loginname, data, callback){
    if(typeof(data) === "string"){
        data = eval('('+data+')');
    }

    if(Object.keys(data).length === 0){
        return callback(null);
    }

    User.getUserByLoginName(loginname, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null,null,Message.User.not_exsits);
        }
        User.UpdateUserProfile(user,data, function(err, newuser){
            if(err){
                return callback(Message.Db.default);
            }
            if(!user){
                return callback(null,null,Message.User.update_error);
            }
            return callback(null, newuser);
        })
    })
}


/**
 * check the provided {filedname:value} is exsists
 * @param filedname
 * @param value
 * @param callback
 * @constructor
 */
exports.CheckFiledIsExist = function(filedname, value, callback){
    var query = util.transformToJSON(filedname, value);
    User.getOneByQuery(query,function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null, false);
        }else{
            return callback(null, true);
        }

    });
}

/**
 * new user regist
 * @param nickname
 * @param loginname
 * @param pass
 * @param email
 * @param avatar_url
 * @param callback
 * @constructor
 */
/*exports.SignUp = function(nickname, loginname, pass, email, avatar_url, callback){
    var query = {$or:[{'loginname':loginname},{'email':email}]};
    User.getOneByQuery(query, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }
        if(user){
           return callback(Message.User.is_exsits);
        }else{
            if(!avatar_url){
                avatar_url = labels.default_avatar_url;
            }
            User.newAndSave(nickname, loginname, pass, email, avatar_url, function(err, user){
                if(err){
                    return callback(Message.Db.default);
                }
                if(!user){
                    return callback(Message.User.signup_error);
                }

                //创建userInfo数据条目
                UserInfo.newAndSave(user._id,function(err){
                    if(err){
                        //log error
                    }
                })

                return callback(null, user);
            })
        }
    })
}*/

exports.SignUp = function(data, callback){
  var query = {$or:[{'loginname':data.loginname},{'email':data.email}]};
    User.getOneByQuery(query, function(err, user){

        if(err){
            return callback(Message.Db.default);
        }
        if(user){
           return callback(Message.User.is_exsits);
        }else{
            if(!data.avatar_url){
                data.avatar_url = labels.default_avatar_url;
            }
            if(!data.nickname)
            	data.nickname = data.loginname;
            User.newAndSave(data, function(err, user){
                if(err){
                    return callback(Message.Db.default);
                }
                if(!user){
                    return callback(Message.User.signup_error);
                }

                //创建userInfo数据条目
                UserInfo.newAndSave(user._id,function(err){
                    if(err){
                        //log error
                    }
                })

                return callback(null, user);
            })
        }
    })

}
