$(function ()
{
    var editorHtml = CodeMirror.fromTextArea(document.getElementById("code_html"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: { "Ctrl-Q": "toggleComment" },
        theme: 'ambiance',
        mode: 'htmlembedded'
    });

    var editorCss = CodeMirror.fromTextArea(document.getElementById("code_css"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: { "Ctrl-Q": "toggleComment" },
        theme: 'ambiance',
        mode: 'css'
    });

    var editorJs = CodeMirror.fromTextArea(document.getElementById("code_js"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: { "Ctrl-Q": "toggleComment" },
        theme: 'ambiance',
        mode: 'javascript'
    });

    var result = $("#code_pre"), resultFrame;

    function change(html)
    {
        result.find("iframe").remove();

        resultFrame = result.append('<iframe id="preview" frameborder="0"></iframe>').find('iframe')[0];
        var preview = resultFrame.contentDocument || resultFrame.contentWindow.document;
        //   preview.designMode = "on";
        preview.open();
        preview.write(html);
        preview.close();
        //            $("#if1").contents().find('html').html(html);
    }

    function getContent()
    {
        var obj = {};
        obj.html = editorHtml.getValue();
        obj.css = editorCss.getValue();
        obj.js = editorJs.getValue();
        return obj;
    }

    function getCombinedHtml(obj)
    {
        var js = obj.js, css = obj.css;
        var html = obj.html;
        var temp = "";
        if (html.indexOf("</body>") > -1)
        {
            var body = [];
            body.push(html.substring(0, html.lastIndexOf("</body>")));
            body.push(html.substring(html.lastIndexOf("</body>")));
            html = body[0];
            temp = body.length == 2 && body[1] ? body[1] : ""
        }

        //  css = editorCss.getValue();

        //  js = editorJs.getValue();

        return html + "<script id='pending_script'>try{\n" + js + "\n}catch(e){\n}<\/script>" + "<style id='pending_style'>" + css + "</style>" + temp;

    }

    $(".publish").click(function ()
    {
        var data = getContent();
        var html = getCombinedHtml(data);
        change(html);

        //   var pathname = location.pathname.split('/')[2];

        data.id = '123';
    });
});