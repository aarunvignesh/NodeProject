/**
 * Created by EMD on 5/4/2015.
 */
var members=require("./socketMemlist.js");
var mainSocket=require('./mainSocket').mainSocket();
var msgArray=require('./msgArray.js');
module.exports=function(value){
    var id="sh"+value.id;
    var self=this;
    //if(members[id]){
        msgArray.forEach(function(obj){
            var newObj=obj;
            //if(members[id].loginTime>newObj.timeStamp) {
                newObj.msg = newObj.msg.replace('popover fade left pull-right', 'popover fade right');
                if (newObj.senderId == value.id) {
                    newObj.msg = newObj.msg.replace('popover fade right', 'popover fade left pull-right');
                }

                mainSocket.to(self.conn.id).emit('chatMsg', newObj.msg);
            //}
        });
    //}
    members[id]={};
    members[id].id=value.id;
    members[id].username=value.username;
    members[id].loginTime=value.loginTime;
    members[id].name=value.username.split("@")[0];
    members[id].status="green";
    members[id].socketId=this.conn.id;
    mainSocket.sockets.emit("chatOnline",require('./onlineMembers.js')(members));
};