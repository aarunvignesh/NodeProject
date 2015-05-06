/**
 * Created by EMD on 5/4/2015.
 */
var members=require("./socketMemlist.js");
var mainSocket=require('./mainSocket').mainSocket();
module.exports=function(value){
    var obj={};
    obj.name=members["sh"+value.id].name;
    obj.socketId=members["sh"+value.id].socketId;
    mainSocket.to(obj.socketId).emit('getName',obj.name);
};