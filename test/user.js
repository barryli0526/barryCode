var User = require('../service/userService');

var testAdd = function(){
	var nickname = "雨天木子";
    var loginname = "barry";
	var pass = "123";
    var email = "abc@gmail.com";
	User.SignUp(nickname, loginname, pass, email, null, function(err, user){
		console.log(user);
	})
}

var testgetUserByName = function(){
	User.getUserProfile("barry", function(err, user){
		console.log(user);
	});
}
testAdd();
/*
{ avatar: 'http://www.gravatar.com/avatar?size=48',
 email: 'abc@gmail.com',
 pass: '123',
 loginname: 'barry',
 nickname: '????',
 _id: 5195ceccfebe629010000001,
 __v: 0,
 receive_at_mail: false,
 receive_reply_mail: false,
 active: false,
 last_login_at: Fri May 17 2013 14:31:40 GMT+0800 (China Standard Time),
 update_at: Fri May 17 2013 14:31:40 GMT+0800 (China Standard Time),
 create_at: Fri May 17 2013 14:31:40 GMT+0800 (China Standard Time) }
*/

