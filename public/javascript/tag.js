String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, i) { return args[i]; });
}


function randomcolor(){

    var str=Math.ceil(Math.random()*16777215).toString(16);

    if(str.length<6){

        str="0"+str;

    }

    return "#"+str;

}


function createTags(max,min){

    $(".tagWrapper a").each(function(){
        var count = parseInt($(this).attr("data-count"),0);
        var size = 10;
        if(count<min || max == min)
            size = 10;
        else{
            size = Math.floor((50*(count-min)/(max-min)));
        }
        if(size < 10)
            size = 10;

        $(this).css({"font-size":size+"px","color":randomcolor()});

        var color = randomcolor();
        $(this).hover(function(){
            $(this).css("background-color",color);
        },function(){
            $(this).css("background-color","");
        })

    })
}
