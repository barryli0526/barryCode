/// <reference path="../lib/jquery/jquery-1.10.2.js" />

(function ($)
{
    function codeSize()
    {
        var article = {
            height: $(window).height() - $("nav").height() - $(".explorer").offset().top - parseInt($(".explorer").css("padding-top"), 10),
            width: $(".explorer").width() - $("nav").width()
        };

        $(".code").height(article.height);
    }

    $(codeSize)
    $(window).resize(codeSize)
})(jQuery);