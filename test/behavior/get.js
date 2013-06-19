var Get = require('../../dl').Get;


var testgetUserPost = function(){

	var userid = "518748b1fc9890a00c000001";
	var pageno = 1;
	var isFirstLoad = true;
	
	Get.getUserPost(userid, pageno, isFirstLoad, function(posts, count){
		console.log(count);
		console.log(posts);
	});

}

var testgetReplies = function(){
	var postid = "518748b1fc9890a00c000001";
	
	Get.getReplies(postid, function(err,replies){
		console.log(replies);
	});
}

testgetReplies();