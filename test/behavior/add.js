var ObjectId = require('mongoose').Types.ObjectId
var Add = require('../../dl').Add;

var mail = require('../../services/mail');

var authorId,repostId;

var testAddNewUser = function(){
	var loginname = "weff";
	var password = "123456";
	var nickname = "jack";
	var email = "barryli0526@126.com";
	Add.AddNewUser(loginname, password, nickname, email, function(err, user){
		console.log(user);
	});

}

var testAddNewPost = function(){
	var content = "This is a new post!!!";
  authorId = "518748b1fc9890a00c000001";
	repostId = "5188a2abdbbcc7f416000001";
	Add.AddNewPost(content, authorId, function(err, post){
		console.log("sdfsdfsdfsdf");
	});
//	Add.AddNewPost(content, authorId, repostId, function(err, post){
//		console.log("aaaaaaaaaaaaaaaaaaaaa");
//	})
}

var testAddNewReply = function(){
	var content = "This is a new reply!!!";
  authorId = "518748b1fc9890a00c000001";
	postId = "5188a2abdbbcc7f416000001";	
	
	Add.AddNewReply(content, authorId, postId, function(err, reply){
		console.log(reply);
	})
}

var testget = function(){
	console.time('find');
	Post.findOneById(new ObjectId("5188a2abdbbcc7f416000001"), function(err, post){
		console.log(post);
		console.timeEnd('find');
		
	});

}

//testAddNewUser();
mail.sendActiveMail("barryli0526@msn.cn","2fdsfsd","barry");