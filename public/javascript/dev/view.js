/// <reference path="../lib/jquery/jquery-1.10.2.js" />
/// <reference path="../lib/requirejs/require.js" />
define(["jquery"], function ($)
{
    var overlay = "<div class='fulllay'></div>",
        codeSize = function ()
        {
            var article = {
                height: $(window).height() - $("nav").height() - $(".explorer").offset().top - parseInt($(".explorer").css("padding-top"), 10),
                width: $(".explorer").width() - $("nav").width()
            };

            $(".code").height(article.height);
        },
        popShow = function (e)
        {
            var target = e.target || window.event.srcElement,
                container = target.parentNode.parentNode,
                classNames = container.getAttribute("class").split(/\s+/gi);

            if (classNames.indexOf("fulllay") == -1)
            {
                classNames.push("fulllay");
                container.setAttribute("class", classNames.join(" "));
            }
            else
            {
                container.setAttribute("class", classNames.join(" ").replace(/(?:\s+|\b)fulllay(?:\s+|\b)/gi, ""));
            }

           // window.resize();
        }

    codeSize();
    $(window).resize(codeSize);
    $(".label img").click(popShow);


    return { resize: codeSize };
});