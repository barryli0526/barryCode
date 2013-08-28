//var Get = require('../../dl').Get;
/*var labService = require('../../service/LabService');
var dbHelper = require('../../dbHelper');
var labProduct = dbHelper.LabProduct;
var parset = require('../../service/Parser');
var path = require('path');*/
var util = require('../../lib/util');


/*var testgetUserPost = function(){

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

//testgetReplies();


var arr = 'qqq,ggg'.split(',');*/

//labProduct.AddResources('V3QZR',{'resources':arr},function(err, doc){
 //       console.log(doc)
//})
//labProduct.removeAllResources('V3QZR',function(){

//})

//labProduct.removeResources('V3QZR',{'resources':['qqq']}, function(err,doc){
//    console.log(doc);
//})

/*
var filepath = path.resolve('../../public/content/library.xml');

parset.xmlParser(filepath, function(err,doc){
    var items = doc.find('library').findall('group');
    items.forEach(function(item,i){
        console.log(item.attrib.name);
    })
    //console.log(items)
})*/


util.createSnapShot('','','',function(){

})
