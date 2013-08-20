module.exports = {
   output:{
    'index':['index.js','javascript/vendor/raphael-min.js','javascript/dev/index.js'],
    'lab':['lab.js','libs/codemirror/lib/codemirror.js','libs/codemirror/mode/javascript/javascript.js','libs/codemirror/mode/css/css.js',
                    'libs/codemirror/mode/htmlmixed/htmlmixed.js','libs/codemirror/mode/htmlembedded/htmlembedded.js','libs/codemirror/addon/edit/matchbrackets.js',
                    'libs/codemirror/mode/xml/xml.js','javascript/dev/common.js','javascript/vendor/jquery.ui.widget.js','javascript/lib/jquery.iframe-transport.js','javascript/lib/jquery.fileupload.js'],
     'article':['article.js','javascript/dev/tag.js','javascript/dev/article.js'],
     'comment':['comment.js','javascript/vendor/jquery.ui.widget.js','javascript/lib/jquery.iframe-transport.js','javascript/lib/jquery.fileupload.js',
                    'libs/code-prettify/prettify.js','libs/ajax-upload/ajaxupload.js','libs/pagedown/Markdown.Converter.js','libs/showdown.js',
                    'libs/pagedown/Markdown.Editor.js'],
     'feed':['feed.min.js','javascript/dev/feed.js'],
     'chat':['chat.min.js','javascript/dev/socket.js'],
     'admin':['admin.min.js','javascript/vendor/jquery-1.9.1.min.js','javascript/vendor/jquery-migrate-1.1.1.min.js','javascript/vendor/jquery-ui-1.10.0.custom.min.js',
                'javascript/vendor/bootstrap.min.js','javascript/lib/jquery.mousewheel.js','javascript/vendor/jquery.ui.widget.js','javascript/lib/jquery.iframe-transport.js',
                'javascript/lib/jquery.fileupload.js','libs/code-prettify/prettify.js','libs/ajax-upload/ajaxupload.js','libs/pagedown/Markdown.Converter.js',
                'javascript/lib/jquery.tagsinput.min.js','javascript/lib/chosen.jquery.min.js','javascript/lib/jquery.uniform.min.js','javascript/dev/main.js']
}
}