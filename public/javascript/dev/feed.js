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

$(function(){
    $('#feedlist li a').click(function(){
        $('#feedlist li a').removeClass('active');
        $(this).addClass('active');

        loadFeedContent($(this).attr('data-feed'));
    })

    loadFeedContent($('#feedlist li a').first().attr('data-feed'));
})