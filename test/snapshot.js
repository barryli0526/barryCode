
var fs = require('fs');
var webshot = require('webshot');
var childProcess = require('child_process')

/*
fs.readFile('../public/user_data/lab/barry/BXDC9/index.html','binary',function(err,data){
    console.log(data);
     webshot(data,'test.png',{siteType:'html'},function(err){
              console.log(err);
    })
})*/



var options = {
    siteType: 'html'
};


/*webshot('<html><body>Hello World</body></html>', './hello_world.png', options, function(err) {
    if (err) return console.log(err);
    console.log('OK');
});*/

var fs = require('fs');


/*fs.readFile('e:/test1/admin.html','utf-8',function(err,data){
      // console.log(data.replace(/ /gi,''));
  *//*  childProcess.exec('phantomjs e:/test1/app.js "'+data+'"', function(err, stdout, stderr) {
        console.log(stdout);
    });*//*


    var data = data.replace(/"/g,"'").replace(/\r?\n/g, "");

    console.log(data);
   //var data = '<html></html>';

    var s = 'phantomjs e:/test1/app.js "'+data+'"';
 //   var s = 'phantomjs e:/test1/app.js "<html><body>Hello World</body></html>"';
   // console.log(s);

   // childProcess.exec(s, function(err, stdout, stderr) {
      //  console.log(stdout);
    //});

    childProcess.spawn('phantomjs',['e:\/test1\/app.js']);

})*/

var path = 'e:/test1/index.html';

childProcess.exec('phantomjs e:/test1/app.js '+path, function(err, stdout, stderr) {
  //  console.log(stdout);
});



/*var phanty = require('phantom');

*//*var system = require('system');*//*

phanty.create(function(err,phantom) {

    //var page = require('webpage').create();

    var address;
    var output;
    var size;
    phantom.createPage(function(page){
        page.open('http://www.google.com', function(err){
            console.log(err);
        //    page.render('./sd.png');
           // phantom.exit();
        })
    })
});*/

/*var phantom=require('node-phantom');
phantom.create(function(err,ph) {
    return ph.createPage(function(err,page) {
        return page.open("http://tilomitra.com/repository/screenscrape/ajax.html", function(err,status) {
            console.log("opened site? ", status);
 *//*           page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
                //jQuery Loaded.
                //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                setTimeout(function() {
                    return page.evaluate(function() {
                        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                        var h2Arr = [],
                            pArr = [];
                        $('h2').each(function() {
                            h2Arr.push($(this).html());
                        });
                        $('p').each(function() {
                            pArr.push($(this).html());
                        });

                        return {
                            h2: h2Arr,
                            p: pArr
                        };
                    }, function(err,result) {
                        console.log(result);
                        ph.exit();
                    });
                }, 5000);
            });*//*
        });
    });
});*/


  /*  phantom.open('http://www.google.com', function (status) {

        console.log(status);
        //fire callback to take screenshot after load complete
        phantom.render('espn.png');
        //finish

        phanty.exit();
    });*/


    /*   if (system.args.length < 4 || system.args.length > 6) {

           // --- Bad Input ---

           console.log('Wrong usage, you need to specify the BLAH BLAH BLAH');
           phantom.exit(1);

       } else {

           phantom.createPage(function(err,page){

               // --- Set Variables, Web Address, Output ---
               address = system.args[2];
               output = system.args[3];
               page.viewportSize = { width: 600, height: 600 };


               // --- Set Variables, Web Address ---
               if (system.args.length > 4 && system.args[3].substr(-4) === ".pdf") {

                   // --- PDF Specific ---
                   size = system.args[4].split('*');
                   page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                       : { format: system.args[4], orientation: 'portrait', margin: '1cm' };
               }

               // --- Zoom Factor (Should Never Be Set) ---
               if (system.args.length > 5) {
                   page.zoomFactor = system.args[5];
               } else {
                   page.zoomFactor = 1;
               }

               //----------------------------------------------------

               page.open(address ,function(err,status){

                   if (status !== 'success') {

                       // --- Error opening the webpage ---
                       console.log('Unable to load the address!');

                   } else {

                       // --- Keep Looping Until Render Completes ---
                       process.nextTick(function () {
                           page.render(output);
                           phantom.exit();
                       }, 200);
                   }

               });

           });
       }*/
/*});*/



