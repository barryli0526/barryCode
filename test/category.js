var Category = require('../service/CategoryService');
var ObjectId = require('mongoose').Types.ObjectId;

var testAdd = function(){

    var name = "开源";
    var desc = "一些开源内容";
    var imgpath = "";
    Category.createACategory(null,name,desc,imgpath,function(err,category){
        console.log(category);
    });


}
/*
 __v: 0,
 category_description: '??????',
 category_name: '??',
 _id: 5195d9b2ed187a901a000001,
 update_at: Fri May 17 2013 15:18:10 GMT+0800 (China Standard Time),
 create_at: Fri May 17 2013 15:18:10 GMT+0800 (China Standard Time) }

 { __v: 0,
 category_description: '??????',
 category_name: '??',
 _id: 5195d9dd801aba040e000001,
 update_at: Fri May 17 2013 15:18:53 GMT+0800 (China Standard Time),
 create_at: Fri May 17 2013 15:18:53 GMT+0800 (China Standard Time) }
* */

testAdd();