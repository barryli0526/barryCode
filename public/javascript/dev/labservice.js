define(["jquery"], function ($){

        var result, resultFrame,editorHtml,editorCss,editorJs;

        function makeid(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function getContent(){
            var obj = {};
            obj.html = editorHtml.getValue();
            obj.css = editorCss.getValue();
            obj.js = editorJs.getValue();

            return obj;
        }

        function getCombinedHtml(obj){
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

            return html + "<script id='pending_script'>try{\n" + js + "\n}catch(e){\n}<\/script>" + "<style id='pending_style'>" + css + "</style>" + temp;
        }

        function change(html) {
            result.find("iframe").remove();
            resultFrame = result.append('<iframe id="preview" frameborder="0"></iframe>').find('iframe')[0];
            var preview = resultFrame.contentDocument || resultFrame.contentWindow.document;
            preview.open();
            preview.write(html);
            preview.close();
        }

        function InitCodeMirror(id, type){
            return CodeMirror.fromTextArea(document.getElementById(id), {
                lineNumbers: true,
                matchBrackets: true,
                continueComments: "Enter",
                extraKeys: { "Ctrl-Q": "toggleComment" },
                theme: 'ambiance',
                lineWrapping:true,
                tabSize:2,
                mode: type
            });
        }

        var init = function(){
                result = $("#code_pre");
                editorHtml = InitCodeMirror('code_html','htmlembedded');
                editorCss = InitCodeMirror('code_css','css');
                editorJs = InitCodeMirror('code_js','javascript');
            } ,

            createPJ = function(){
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
            },

            savePJ = function(){
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
                            preview();
                    }
                })
            },

            deletePJ = function(self){
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
            },

            preview = function(){
                var data = getContent();
                var html  =  getCombinedHtml(data);
                change(html);
            },

            publish = function(){
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
            },

            uploadRs = function(){
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
            },

            linkRs = function(self){
                var from = editorHtml.getCursor();
                editorHtml.replaceRange($(self).attr('href'),from);
            },
            deleteRs = function(self){
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
            },

            linkLib = function(self){
                var ls = $(self).attr('data-href');
                if(ls){
                    ls = '<script src="' + ls +'"></script>';
                    var from = editorHtml.getCursor();
                    editorHtml.replaceRange(ls,from);
                }

                $(self).closest('ul').css('display','none');
            }
            ;


        return {
            InitProject : init,
            CreateProject:createPJ,
            SaveProject:savePJ,
            DeleteProject:deletePJ,
            PreviewProject:preview,
            PublishProject:publish,
            UploadResource:uploadRs,
            LinkResource:linkRs,
            DeleteResource:deleteRs,
            LinkLibs:linkLib
        }
});