var Article = require('../service/articleService');
var model = require('../models').Article;
var ObjectId = require('mongoose').Types.ObjectId;
var parser = require('../service/Parser');

var authorId,repostId;

var testAdd = function(){
    var title = '周鸿祎低调布局 搜索领域预演"3B大战"';
  	var summary = '告诉大家赚钱的机会：赶紧买360的股票吧！”8月20日10点54分，站长之家创始人姚剑军在其新浪微博上留下了这样一句话。第二天，360果真在纳斯达克全天上涨9%。自上周以来，这家中国互联网公司的股价已经累计上涨20%。';
    var content = '告诉大家赚钱的机会：赶紧买360的股票吧！”8月20日10点54分，站长之家创始人姚剑军在其新浪微博上留下了这样一句话。第二天，360果真在纳斯达克全天上涨9%。自上周以来，这家中国互联网公司的股价已经累计上涨20%。王小川也表示，360推出后，谷歌流量将大跌，百度小跌，搜狗受影响最小。他指出，搜狗有浏览器的围墙，流量来源主要为搜狗浏览器和渠道购买，与360的重合度不高，对其市场份额影响不大。' ;

   // var categories = "5196df8b02eaf9a415000001,5196dfb7a06e1de017000001";
    var categories = '5195d9b2ed187a901a000001,5195d9dd801aba040e000001';
    var tags = "开源,安卓";
    var keywords = "开源,安卓";
    var desc = "介绍了Android Studio的内容";
   // var authorId = new ObjectId("5196e0755fd8dc9412000001");
    var authorId = new ObjectId('5195ceccfebe629010000001');
	//console.log(authorId);
	//5188a302eeeeaa100e000001
    Article.CreateArticle(authorId,title,summary, content, categories, tags, keywords, desc,function(err,post){
		console.log(post);
	});
}

var testget = function(){
	console.time('find');
    Article.getDetailsofArticle(new ObjectId("5195da68a8d8ed080b000001"), function(err, post){
		console.log(post.info);
		console.timeEnd('find');
		
	});
}

var testgetAll = function(){
    console.time('find');
    Article.getArticles(10,0,function(err, artilcs){
        console.log(artilcs[0].category);
        console.timeEnd('find');
    })
}

var tesedelete = function(){
    Article.deleteAllArticles(function(){
         console.log("===delete over===");
    })
}

var testcount = function(){
    console.time('find');
    Article.getCountOfArticles(function(err,count){
        console.log(count);
        console.timeEnd('find');
    })
}

///testAdd();
parser.ParseRequest();


/*
 { __v: 0,
 meta_description: '??,??',
 meta_keywords: '??,??',
 tags: '??,??',
 article_content: '??????? Android ????Android Studio ??? ',
 author_id: 5195ceccfebe629010000001,
 _id: 5195ddd0ee7a493c17000001,
 last_reply_at: Fri May 17 2013 15:35:44 GMT+0800 (China Standard Time),
 update_at: Fri May 17 2013 15:35:44 GMT+0800 (China Standard Time),
 create_at: Fri May 17 2013 15:35:44 GMT+0800 (China Standard Time),
 state: 0,
 enable_comment: true,
 top: false }
 */



//behavior.AddNewRepost("lalalalalal","518748b1fc9890a00c000001","5188a2abdbbcc7f416000001",function(err,post){
//	console.log(post);
//});