/**
 * Created by EMD on 5/5/2015.
 */
var list=require("./socketMemlist.js");
var mainSocket=require('./mainSocket').mainSocket();
module.exports=function(value){
    var names=[];
    var self=this;
    var iterations=Object.keys(list);
    iterations.forEach(function(obj){
       if(self.conn.id==list[obj].socketId){
            list[obj].status="black";
        }
     });
    mainSocket.sockets.emit("chatOnline",require('./onlineMembers.js')(list));
};