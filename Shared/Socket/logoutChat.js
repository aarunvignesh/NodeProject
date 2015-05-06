/**
 * Created by EMD on 5/4/2015.
 */
var members=require("./socketMemlist.js");
var mainSocket=require('./mainSocket').mainSocket();
module.exports=function(value){
    var id="sh"+value.id;
    delete members[id];
    mainSocket.sockets.emit("chatOnline",require('./onlineMembers.js')(members));
};