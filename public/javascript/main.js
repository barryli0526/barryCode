$(document).ready(function(){
    /*----------- BEGIN chosen CODE -------------------------*/

    $(".chzn-select").chosen();
    $(".chzn-select-deselect").chosen({
        allow_single_deselect: true
    });

    /*----------- END chosen CODE -------------------------*/
    
    /*----------- BEGIN tagsInput CODE -------------------------*/
    $('#tags').tagsInput({
    	'defaultText':'输入文章标签'//默认输入框的文本提示
    });
    /*----------- END tagsInput CODE -------------------------*/

    /*----------- BEGIN uniform CODE -------------------------*/
    $('.uniform').uniform();
    /*----------- END uniform CODE -------------------------*/

    /*----------- BEGIN collaspe CODE -------------------------*/
    $('.accordion-group').bind('click',function(){
        $('.accordion-group').each(function(){
            $(this).removeClass('active');
        })
        $(this).addClass('active');
    })

    var pathname = location.pathname.split('/');
    var aim = (pathname && pathname.length > 3) ? pathname[2] : 'article';

    $('#'+aim).each(function(){
        $('.accordion-group').each(function(){
            $(this).removeClass('active');
        })
        $(this).addClass('active');
        $('.collapse',$(this)).addClass('in');
    })

    /*----------- END submit CODE -------------------------*/

    /*----------- BEGIN article table CODE -------------------------*/

    $('.table tbody tr').hover(function(){
        $('.row-actions',$(this)).show();
    },function(){
        $('.row-actions',$(this)).hide();
    })


    $(".checkall").change(function(){
       if($(this).attr("checked") === 'checked'){
           $('.check').attr('checked', true);
       }else{
           $('.check').attr('checked', false);
       }
    })

    submitDelete();

    /*----------- END article table CODE -------------------------*/

    //update Article
    updateArticle();

    /*---*/
   /* $('#dataTable_wrapper .listCount').change(function(){
        var url = '/admin/article/edit';

        var listcount = $(this).val();

      //  location.href = url;
        $.get(url,{'_': $.now(),'action':'dynamicget','listcount':listcount},function(data){
            $('.dynamic').html(data);
        });
    }) */



});

function submitDelete(){
    $('.submit_delete').click(function(){

        var self = $(this);
        if(self.hasClass("disabled")){
            return;
        }else{
            self.addClass("disabled");
        }

        var url = $(this).closest('.dataTables_wrapper').find('table').attr('data-action')+ '/delete';
        var arr = [];
        $('.check').each(function(i){
            if($(this).attr('checked'))
            arr.push($(this).closest('tr').attr('data-id'));
        })
        if(arr.length === 0){
            return;
        }

        var data = {dataIds:arr};

        $.ajax({
            url:url,
            type:"post",
            data:data,
            success:function(){
                location.href = location.href;
            }
        })
    })
}

function updateArticle(){
    $('.update_article').click(function(){
        var form = $(this).closest('.row-fluid').find('form');
        var seria_str = form.serialize();

        var oldcategory = $('#category_chosen').attr('data-original-value');
        var newcategory = $('#category_chosen').val().split(',');//add split for multi support(in progress)

        if(typeof(oldcategory) === "string")
            oldcategory = oldcategory.split(',');

        var removed = [];
        var added = [];

        oldcategory.forEach(function(value){
            if(newcategory.indexOf(value) === -1)
                removed.push(value);
        })

        newcategory.forEach(function(value){
            if(oldcategory.indexOf(value) === -1)
                added.push(value);
        })



        if(removed.length != 0)
            seria_str += '&category_removed='+removed;
        if(added.length != 0)
            seria_str += '&category_added='+added;


        $.ajax({
            url:form.attr('action'),
            type:"post",
            data:seria_str,
            success:function(){
                location.href = location.href;
            }
        })
    })
}


