$(function(){

    createSVG();

    $('#feedlist li a').click(function(){
        $('#feedlist li a').removeClass('active');
        $(this).addClass('active');

        loadFeedContent($(this).attr('data-feed'));

    })

    loadFeedContent($('#feedlist li a').first().attr('data-feed'));

})


function loadFeedContent(fdname){

    var url = '/getfeed?fdname='+fdname;

    $('.feedcontent').html('');
    $(".list-preload").show();

    $.ajax({
        url:url,
        type:"get",
        success:function(data){
            $(".list-preload").hide();
            $('.feedcontent').html(data);
            bindEvent();
        }
    })

}


function bindEvent(){


    $(".feedcontent .title").click(function(){

        var $post = $(this).closest('.post');
        //   alert('adf');

        if($('.art-desc',$post).is(':hidden')){
            $('.art-detail',$post).hide('fast');
            $('.art-desc',$post).show('slow');
            return false;
        }
        $('.art-desc',$post).hide();
        var preloader = $(this).next('.preload');
        preloader.show();

        var url = '/feeds/get?url=' + encodeURIComponent($(this).attr('data-src')) +'&fdname='+$("#feedlist .active").attr('data-feed');
        //  alert(encodeURIComponent($(this).attr('data-src')));
        var self = this;
        $.ajax({
            url:url,
            type:"get",
            cache:false,
            success:function(data){

                //  var $wrapper = $('.content',$(self).closest('.post'));
                preloader.hide();
                var content = '<div class="art-detail">' + data + '</div>' ;
                $('.content',$(self).closest('.post')).append($(content));
                //     return false;
            }
        })
        return false;
    })

}


function createSVG()
{
    if(typeof Raphael === 'undefined')
        return;
    var paper            = Raphael("paper", "100%", "100%"),

        SERIOUSBALLOONS  = {
            "about-us"       : new rMotion(paper),
            "Blog"           : new rMotion(paper),
            "news"           : new rMotion(paper),
            "chat"           : new rMotion(paper),
            "runjs"          : new rMotion(paper),
            odd1             : new rMotion(paper),
            odd2             : new rMotion(paper),
            odd3             : new rMotion(paper),
            odd4             : new rMotion(paper),
            odd5             : new rMotion(paper)
        },
        $obj = {};

    var offsetWidth = ($("#paper").width() - 940) / 2;

    SERIOUSBALLOONS.odd1.createCircle(offsetWidth + 175, 385, 85, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 345, 635);
    SERIOUSBALLOONS.odd2.createCircle(offsetWidth + 280, 230, 40, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 425, 635);
    SERIOUSBALLOONS.odd3.createCircle(offsetWidth + 485, 245, 115, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 480, 640);
    SERIOUSBALLOONS.odd4.createCircle(offsetWidth + 500, 480, 50, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 480, 640);
    SERIOUSBALLOONS.odd5.createCircle(offsetWidth + 735, 385, 65, 150, 10000, "rgba(0, 0, 0, 0.15)", "", "", "", offsetWidth + 595, 650);

    SERIOUSBALLOONS["about-us"].createCircle(offsetWidth + 240, 470, 88, 100, 5000, "#e95325", "ABOUT US", "assets/about.jpg", "assets/about.jpg", offsetWidth + 345, 635);
    SERIOUSBALLOONS["Blog"].createCircle(offsetWidth + 375, 275, 115, 100, 6000, "#1b8abe", "Blog", "assets/blog.jpg", "assets/blog.jpg", offsetWidth + 425, 635);
    SERIOUSBALLOONS["news"].createCircle(offsetWidth + 595, 345, 95, 100, 5500, "#ef5fa3", "NEWS", "assets/read.jpg", "assets/read.jpg", offsetWidth + 480, 640);
    SERIOUSBALLOONS["chat"].createCircle(offsetWidth + 720, 510, 80, 100, 5000, "#4ba93c", "Chat", "assets/chat.jpg", "assets/chat.jpg", offsetWidth + 595, 650);
    SERIOUSBALLOONS["runjs"].createCircle(offsetWidth + 480, 460, 80, 100, 5000, "#161a1b", "RunJS", "assets/runjs.png", "assets/runjs.png", offsetWidth + 480, 640);

    seriousLogo = paper.image("assets/mainLogo.png", offsetWidth + 310, 630, 300, 52);

    SERIOUSBALLOONS["about-us"].click(function() {
        //    history.pushState({ url: "/about-us/", pagename: "about-us" }, "about us", "/about-us/");
        //    SERIOUS.navigation.loadPage( "/about-us/", "about-us");
        location.href = '/about';
    });
    SERIOUSBALLOONS["Blog"].click(function() {
        //     SERIOUS.navigation.loadPage( "/admin/", "our-work");
        //    history.pushState({ url: "/admin/", pagename: "our-work" }, "our work", "/our-work/");
        location.href = '/articles';
    });
    SERIOUSBALLOONS["news"].click(function() {
        //   SERIOUS.navigation.loadPage( "/feeds/", "news-and-notes");
        //  history.pushState({ url: "/feeds/", pagename: "news-and-notes" }, "news and notes", "/news-and-notes/");
        location.href = '/feeds';
    });
    SERIOUSBALLOONS["chat"].click(function() {
        //    SERIOUS.navigation.loadPage( "/reach-out/", "reach-out");
        //    history.pushState({ url: "/reach-out/", pagename: "reach-out" }, "reach out", "/reach-out/");
        location.href = '/chat';
    });
    SERIOUSBALLOONS["runjs"].click(function() {
        location.href = '/lab';
    });
}