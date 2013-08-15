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
        tabSize:2,
        lineWrapping:true,
        mode: 'htmlembedded'
    });

    var editorCss = CodeMirror.fromTextArea(document.getElementById("code_css"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: { "Ctrl-Q": "toggleComment" },
        theme: 'ambiance',
        lineWrapping:true,
        tabSize:2,
        mode: 'css'
    });

    var editorJs = CodeMirror.fromTextArea(document.getElementById("code_js"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: { "Ctrl-Q": "toggleComment" },
        theme: 'ambiance',
        lineWrapping:true,
        tabSize:2,
        mode: 'javascript'
    });


    var result = $("#code_pre"), resultFrame;

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

    function preiviewContent(){
        var data = getContent();
        var html  =  getCombinedHtml(data);
        change(html);
    }

    $('#preview').click(function(){
        preiviewContent();
        return false;
    })

    $(".publish").click(function () {
        var data = getContent();
        var html  =  getCombinedHtml(data);
       // change(html);

        var sid = location.pathname.split('/')[2];

        if(!sid){
            sid = $('.prj_selected').attr('id');
        }

        data.id = sid;
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
        return false;
    });

    function saveProject(){
        var data = getContent();
        var sid = location.pathname.split('/')[2];

        if(!sid){
            sid = $('.prj_selected').attr('id');
        }

        $.ajax({
            url:'/lab/'+sid,
            type:'put',
            data:data,
            success:function(data){
                if(data && data.status == 'success')
                    preiviewContent();
            }
        })
    }

    $("#save").bind('click', saveProject);

    function makeid(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $('#create_project').click(function(){
        var name = window.prompt('请输入项目名称',"");
        if(name !== '' && name !== null)
        {
            var pid = makeid();
            var project = {};
            project.name = name;
            project.sid = pid;

            $.ajax({
                url:'/lab/create',
                type:"post",
                data:project,
                success:function(data){
                    location.href = '/lab/'+pid+'/edit';
                }
            })
        }

    })

    $('#add_resource,#upload_now').click(function(){
        var input = $('<div class="inputbox"><input id="fileupload" type="file" name="files[]" multiple/></div>');
        var LI = '<li><a class="rname" href="{0}">{1}</a><a class="rdelete">删除</a></li>';
        $("body").append('<div class="overlay"></div>');
        $("body").append(input);

        var sid = location.pathname.split('/')[2];

        if(!sid){
            sid = $('.prj_selected').attr('id');
        }

        var url = '/lab/upload?sid='+sid;
        input.fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {

                if(data.result.status === 'success' && data.result.url) {
                    var url = data.result.url;

                    $('.overlay').remove();
                    $('.inputbox').remove();
                     $('.resources .tip').remove();
                    var names = [];

                    if(typeof(url) === 'object'){

                        $('.resources li a').each(function(){
                             names.push($(this).html());
                        })

                        url.forEach(function(doc){
                            var name = doc.name.split('_')[1];
                            var prefixname = name.split('.')[0];
                            var type = name.split('.')[1];
                            var index = 0;
                            while(names.indexOf(name) != -1){
                                name  = prefixname + index + '.' + type;
                                index++;
                            }
                            names.push(name);

                            $('.resources').append(LI.format(doc.url,name));
                        })
                    }
                }
                else
                    alert('上传失败');
            }
        });
    })

    $('.resources li,.projects li').live('hover',function(e){
        if(e.type == 'mouseenter'){
            $('.rdelete',$(this)).show();
            return false;
        }else if(e.type == 'mouseleave'){
            $('.rdelete',$(this)).hide();
            return false;
        }
    })

    $('.resources .rname').live('click', function(){
        var from = editorHtml.getCursor();
        editorHtml.replaceRange($(this).attr('href'),from);
        return false;
    })


    $('.resources .rdelete').live('click', function(){
        var self = this;
        var ele = $(self).closest('li').find('a')[0];
        var rs = $(ele).attr('href');
        var sid = location.pathname.split('/')[2];

        if(!sid){
            sid = $('.prj_selected').attr('id');
        }

        $.ajax({
            url:'/lab/resources/'+sid,
            type:"delete",
            data:{'url':rs},
            success:function(data){
                if(data.status === 'success'){
                    $(self).closest('li').remove();
                }

            }
        });
    })


    //ctrl+s

    $(window).bind('keydown',function(e){
        if(e.keyCode == 83 && e.ctrlKey){
            e.preventDefault();
            saveProject();
        }
    })

    //helper
    $('#helper').bind('click',function(){
        alert('下个版本出。。。');
    })

    //setting
    $('#setting').bind('click',function(){
        alert('下个版本出。。。');
    })

    //handler toolbar

    $('.explorer nav ul li ul li').not('.catelog').bind('click', function(){


        var ls = $(this).attr('data-href');
        if(ls){
            ls = '<script src="' + ls +'"></script>';
            var from = editorHtml.getCursor();
            editorHtml.replaceRange(ls,from);
        }

        $(this).closest('ul').css('display','none');
    })

    //toolbar hover
    $('.explorer nav ul li').live('hover',function(e){
        if(e.type == 'mouseenter'){
            $(this).find('ul').show();
        }else if(e.type == 'mouseleave'){
            $(this).find('ul').hide();
        }
    })

    //delete project

    $('.project .rdelete').live('click', function(){
        var self = this;
        var ele = $(self).closest('li').find('a')[0];
        var rs = $(ele).attr('href');
        var sid = location.pathname.split('/')[2];

        if(!sid){
            sid = $('.prj_selected').attr('id');
        }

        $.ajax({
            url:'/lab/'+sid,
            type:"delete",
            data:{'url':rs},
            success:function(data){
                if(data.status === 'success'){
                    location.href = '/lab';
                }

            }
        });
    })
});