/// <reference path="../lib/requirejs/require.js" />
/*window.HtmlControl = window.HtmlControl || {};

requirejs.config({
    paths: {
        jquery: "../vendor/jquery-1.9.1.min"
    },
    shim: {
        jquery: {
            exports: "jQuery"
        }
    }
});*/

var  paths = {};

if (!jQuery) {
    // load if it's not available or doesn't meet min standards
    paths.jquery = "../vendor/jquery-1.9.1.min";
} else {
    // register the current jQuery
    define('jquery', [], function() { return jQuery; });
}

requirejs.config({
    paths:paths
});

requirejs(["jquery"], function ($)
{
    $(function(){
        requirejs(["view", "../../libs/contextmenu/contextmenu", "labservice"], function (view, control, lab)
        {

            /*init text area*/
            lab.InitProject();

            /*init context menu*/
            var menuItem = control.menuItem;
            var ContextMenu = control.contextMenu;

            var c_xj = new menuItem("新建项目", undefined, false, {
                    "click": lab.CreateProject
                }),
                r_xj = new menuItem("上传资源", undefined, false, {
                    "click": lab.UploadResource
                }),

                sep = new menuItem("", "", true),

                r_del = new menuItem("删除资源", "", false, {
                    "click": function () { lab.DeleteResource(this) }
                }),
                c_del = new menuItem("删除项目", "", false, {
                    "click": function () {
                        lab.DeleteProject(this)
                    }
                }),
                c_down = new menuItem("Download", "", false, {
                    "click": function () { alert("download code") }
                }),
                c_edit = new menuItem("Edit", "", false, {
                    "click": function () {
                        location.href = '/lab/'+$(this).closest('.project').attr('id')+'/edit';
                    }
                });

            var code = new ContextMenu("#create_project", "cproj", { disable: 1, children: [c_xj] });
            $("#create_project").click(function (e)
            {
                code.show.call(this, e);
            });
            var resource = new ContextMenu("#add_resource", "rsou", { disable: 1, children: [r_xj] });
            $("#add_resource").click(function (e)
            {
                resource.show.call(this, e);
            });

            var resourceMenu = new ContextMenu(".resources li>a", "rsoum", { children: [r_del] });
            var codeMenu = new ContextMenu(".projects li a", "cprojm", { children: [c_del, c_down, sep, c_edit], richStyle: true });
            control.ready([".projects"]);


            /*bind events*/

            $('#preview').click(function(){
                lab.PreviewProject();
                return false;
            })

            $(".publish").click(function () {
                lab.PublishProject();
                return false;
            });

            $("#save").bind('click', lab.SaveProject);


         //   $('#add_resource,#upload_now').click(function(){
        //        Lab.UploadResource();
         //   })

       //     $('.resources li,.projects li').live('hover',function(e){
        //        if(e.type == 'mouseenter'){
        //            $('.rdelete',$(this)).show();
        //            return false;
        //        }else if(e.type == 'mouseleave'){
       //             $('.rdelete',$(this)).hide();
       //             return false;
       //         }
      //      })

            $('.resources .rname').on('click', function(){
                lab.LinkResource(this);
                return false;
            })


       //     $('.resources .rdelete').live('click', function(){
      //          Lab.DeleteResource(this);
      //      })


            //ctrl+s

            $(window).bind('keydown',function(e){
                if(e.keyCode == 83 && e.ctrlKey){
                    e.preventDefault();
                    lab.SaveProject();
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
                lab.LinkLibs(this);
            })

            //toolbar hover
            $('.explorer nav ul li').on('hover',function(e){
                if(e.type == 'mouseenter'){
                    $(this).find('ul').show();
                }else if(e.type == 'mouseleave'){
                    $(this).find('ul').hide();
                }
            })

            //delete project

        //    $('.project .rdelete').live('click', function(){
        //        Lab.DeleteProject(this);
        //    })



        })
    });
});



