$(function () {

    String.prototype.HtmlEncode = function () {
        var tmpDiv = document.createElement("div");
        if (tmpDiv.innerText != null)
            tmpDiv.innerText = this.toString();
        else
            tmpDiv.textContent = this.toString();
        return tmpDiv.innerHTML;
    };
    String.prototype.HtmlDecode = function () {
        var tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = this.toString();
        return tmpDiv.innerText ? tmpDiv.innerText : tmpDiv.textContent;
    };


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


    var result = $("#result"), resultFrame;

    function change(html) {
        result.find("iframe").remove();

        resultFrame = result.append('<iframe id="preview" frameborder="0"></iframe>').find('iframe')[0];
        var preview = resultFrame.contentDocument || resultFrame.contentWindow.document;
        //   preview.designMode = "on";
        preview.open();
        preview.write(html);
        preview.close();
        //            $("#if1").contents().find('html').html(html);
    }

    function getContent(){
        var obj = {};
        obj.html = editorHtml.getValue();
        obj.css = editorCss.getValue();
        obj.js = editorJs.getValue();
        return obj;
    }

    function getCombinedHtml(obj) {
        var js = obj.js, css = obj.css;
        var html = obj.html;
        var temp = "";
        if (html.indexOf("</body>") > -1) {
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

    $('#save').click(function(){
        var data = getContent();
        var html  =  getCombinedHtml(data);
        change(html);
    })

    $(".publish").click(function () {
        var data = getContent();
        var html  =  getCombinedHtml(data);
       // change(html);

        var pathname = location.pathname.split('/')[2];

        data.id = pathname;
        data.content = html;

        $.ajax({
            url:'/lab/save',
            type:"post",
            data:data,
            success:function(data){
            //    alert(data);
                location.href = '/lab/'+data;
            }
        })
    });

    function makeid(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $('#create_project').click(function(){
        var name = window.prompt('请输入项目名称',"");
        var pid = makeid();

        var project = {};
        project.name = name;
        project.sid = pid;

        $.ajax({
            url:'/lab/create',
            type:"post",
            data:project,
            success:function(data){
                //    alert(data);
                location.href = '/lab/'+pid+'/edit';
            }
        })

    })


});