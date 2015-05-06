/**
 * Created by EMD on 5/4/2015.
 */
var io=require('socket.io');
var members=require("./socketMemlist.js");
var mainSocket;
var create=function(server){
    mainSocket=new io(server);
    mainSocket.on('connection',function(socket){
        socket.on("loginChat",require('./loginChat.js'));
        //require("./cricketScore.js")();
        socket.on("logoutChat",require('./logoutChat.js'));
       require("./sendChatMsg")(socket);
        socket.on('disconnect',require('./userDisconnect.js'));
        socket.on('getName',require('./getName.js'));

    });
};
module.exports={
    create:create,
    mainSocket:function(){return mainSocket;}
};