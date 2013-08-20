var fs = require('fs');

var jsp = require("uglify-js").parser;

var pro = require("uglify-js").uglify;

var cleanCSS = require('clean-css');

var jsmerge = require('./public/javascript/prod/jsmerge');

var cssmerge = require('./public/stylesheets/cssmerge');



function jsMinifier(flieIn, fileOut, type) {

    var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];

    var origCode,ast,finalCode='';




    for(var i=0; i<flieIn.length; i++) {

        origCode = fs.readFileSync('public/'+flieIn[i], 'utf8');

     //   console.log('====add   '+flieIn[i] + '=====');

        ast = jsp.parse(origCode);
       // console.log(type);
        if(type !== 'dev'){
            console.log(type);
            ast = pro.ast_mangle(ast);

            ast= pro.ast_squeeze(ast);


        }else{
           // finalCode +=';'+ ast;
        }


        finalCode +=';'+ pro.gen_code(ast);



    }

    fs.writeFileSync('public/javascript/prod/'+fileOut, finalCode, 'utf8');

}


function cssMinifier(flieIn, fileOut) {

    var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];

    var origCode,finalCode='';

    for(var i=0; i<flieIn.length; i++) {

        origCode = fs.readFileSync('public/'+flieIn[i], 'utf8');

        finalCode += cleanCSS.process(origCode);

    }

    fs.writeFileSync('public/stylesheets/prod/'+fileOut, finalCode, 'utf8');

}

function Merge(type){
    var output = jsmerge.output;

    console.log('============JS Merge Begin==============');

    for(var item in output){
        // console.log(item);
        var fileOut = output[item].shift();
        var fileInt = output[item];
        jsMinifier(fileInt,fileOut,type);
    }

    console.log('============JS Merge Done==============');

    output = cssmerge.output;

    console.log('============CSS Merge Begin==============');

    for(var item in output){
        // console.log(item);
        var fileOut = output[item].shift();
        var fileInt = output[item];
        cssMinifier(fileInt,fileOut);
    }

    console.log('============CSS Merge Done==============');
}





module.exports = function(env){
    env =  env ? env : 'dev';

    Merge(env);


}
