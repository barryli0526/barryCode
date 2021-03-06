﻿
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, i) { return args[i]; });
}

$(function() {
    //Socket.io
    var socket = io.connect('http://121.199.58.200:3000');

    socket.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
    });

    socket.on('connect', function (){
        console.info('successfully established a working connection');
     //   if($('.chat .chat-box').length == 0) {
    //        socket.emit('history request');
     //   }
    });


    socket.on('new user', function(data) {
     //   var message = "$username has joined the room.";

        var name = data.nickname;
        var status =data.status;

        var template = '<li class="user" id="{0}"><a><img src="http://www.gravatar.com/avatar/74bb09af96c486d9d72891626dd51df8.png"/>' +
            '<span class="name">{1}</span>' +
            '<span class="status">{2}</span>' +
            '</a></li>';

        var profile = $(template.format(data.sid,name, status));
        $('#userlist').append(profile);


    });


    socket.on('new msg', function(data){

        var msg = $('<p>'+ data.nickname+ '说：' + data.msg +'</p>')

        $('.chatcontent').append(msg);
    })


    socket.on('user leave', function(data) {
        if(!data || !data.sid){
            console.log('wrong format data');
        }

         $('#' + data.sid).remove();

    });


    $('.submit').click(function(){
        var txt = $('.chat').val();
        socket.emit('my msg',{
            msg:txt
        })
        $('.chat').val('');

    })

});
