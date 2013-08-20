$(document).ready(function(){
    var editors = {};
    var aritlceid = $('.post').attr('articleid').toString();
    function run_md_editor(){
        var converter = new Showdown.converter();
        editors[""] = new Markdown.Editor(converter);
        editors[""].run();

        $(".content,.commet-content").each(function(){
            var value = $(this).text().trim();
            //  console.log(value);
            $(this).html(converter.makeHtml(value));
        });

        $('.reply_editor').each(function() {
            var editor_id = $(this).attr('id');
            var suffix = editor_id.slice(editor_id.indexOf('-'));
            editors[suffix] = new Markdown.Editor(converter, suffix);
            editors[suffix].run();
        });
    }
    run_md_editor();

    $('.preview-btn').click(function() {
        var href = $(this).attr('href');
        var index = href.lastIndexOf('-');
        var suffix = index < 0 ? '' : href.slice(index);

        editors[suffix].makePreviewHtml();
        prettyPrint();
        //editor.makePreviewHtml();
        //prettyPrint();
    });


    $('#submit_btn').click(function(){
        $('#create_comment_form').submit();
    });

    $('.submit_reply').click(function(){
        var url = '/'+aritlceid+'/comment/'+$(this).closest('.comment').attr('cid').toString();
        var data = $('textarea',$(this).closest('.reply_area')).val();
        $.ajax({
            url : url,
            type:'post',
            data: {'t_content':data},
            success: function(comment){
                // do sth;
                //console.log(comment);
                location.href = location.href;
            }
        });
    });

    //

    $(".reply_btn").toggle(function(){
        var parent = $(this).closest('.comment');
        var reply_area = $('.reply_area',parent);
        reply_area.show();
        $('textarea',reply_area).val('@'+$('.name',parent).text());

    },function(){
        $('.reply_area',$(this).closest('.comment')).hide();
    });
});