/**
 * Created by EMD on 5/4/2015.
 */
var members=require("./socketMemlist.js");
var mainSocket=require('./mainSocket').mainSocket();
var msgArray=require('./msgArray.js');
var fillSmiley=function(msg){
    if(msg.indexOf(':)')>-1){
        msg= msg.replace(':)',"<img src='../smileys/gentle laugh.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':(')>-1){
        msg=msg.replace(':(',"<img src='../smileys/cry.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':D')>-1){
        msg=msg.replace(':D',"<img src='../smileys/rofl.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':P')>-1){
        msg=msg.replace(':P',"<img src='../smiley2.png' style='height:50px;'/>");
    }

    if(msg.indexOf(';)')>-1){
        msg= msg.replace(';)',"<img src='../smileys/wink smile.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('=-o')>-1){
        msg=msg.replace('=-o',"<img src='../smileys/stare.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':*')>-1){
        msg=msg.replace(':*',"<img src='../smileys/kiss.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('8)')>-1){
        msg=msg.replace('8)',"<img src='../smileys/glass smile.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':]')>-1){
        msg=msg.replace(':]',"<img src='../smileys/smile3.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':--/')>-1){
        msg=msg.replace(':--/',"<img src='../smileys/smile2.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('o:-)')>-1){
        msg=msg.replace('o:-)',"<img src='../smileys/angelring.png' style='height:50px;'/>");
    }
    if(msg.indexOf('|o')>-1){
        msg= msg.replace('|o',"<img src='../smileys/sleep.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':-(')>-1){
        msg=msg.replace(':-(',"<img src='../smileys/know Laugh.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('8-)')>-1){
        msg=msg.replace('8-)',"<img src='../smileys/glass smile 2.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':X')>-1){
        msg=msg.replace(':X',"<img src='../smileys/shut.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':S)')>-1){
        msg=msg.replace(':S)',"<img src='../smileys/success.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('3-)')>-1){
        msg=msg.replace('3-)',"<img src='../smileys/dream.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('!:|')>-1){
        msg=msg.replace('!:|',"<img src='../smileys/idea.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':K')>-1){
        msg=msg.replace(':K',"<img src='../smileys/giggle.png' style='height:50px;'/>");
    }
    else if(msg.indexOf('3:-]')>-1){
        msg=msg.replace('3:-]',"<img src='../smileys/dontknow.png' style='height:50px;'/>");
    }

    else if(msg.indexOf(':}')>-1){
        msg=msg.replace(':}',"<img src='../smileys/think.png' style='height:50px;'/>");
    }
    else if(msg.indexOf(':{')>-1){
        msg=msg.replace(':{',"<img src='../smileys/think1.png' style='height:50px;'/>");
    }
    if(msg.indexOf(':)')>-1 || msg.indexOf(':(')>-1 || msg.indexOf(':D')>-1 || msg.indexOf(':P')>-1 || msg.indexOf(';)')>-1 || msg.indexOf('=-o')>-1 || msg.indexOf(':*')>-1 || msg.indexOf('8)' ||  msg.indexOf(':]')>-1 || msg.indexOf(':--/')>-1  || msg.indexOf('o:-)')>-1 || msg.indexOf('|o')>-1 || msg.indexOf(':-(')>-1 || msg.indexOf('8-)')>-1 || msg.indexOf(':X')>-1  || msg.indexOf(':S)')>-1 || msg.indexOf('3-)')>-1 || msg.indexOf('!:|')>-1 ||  msg.indexOf(':K')>-1 || msg.indexOf('3:-]')>-1)>-1 ||  msg.indexOf(':}')>-1 || msg.indexOf(':{')>-1){
        msg=fillSmiley(msg)
    }
    else{
        fillSmiley.msg=msg;
    }
};
module.exports=function(socket){
    socket.on('chatMsg',function(value){
    var msg=value.msg;
    var self=this;
    if(msg.indexOf(':)')>-1 || msg.indexOf(':(')>-1 || msg.indexOf(':D')>-1 || msg.indexOf(':P')>-1  || msg.indexOf(';)')>-1 || msg.indexOf('=-o')>-1 || msg.indexOf(':*')>-1 || msg.indexOf('8)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':--/')>-1  || msg.indexOf('o:-)')>-1 || msg.indexOf('|o')>-1 || msg.indexOf(':-(')>-1 || msg.indexOf('8-)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':X')>-1  || msg.indexOf(':S)')>-1 || msg.indexOf('3-)')>-1 || msg.indexOf('!:|')>-1 ||  msg.indexOf(':K')>-1 || msg.indexOf('3:-]')>-1 || msg.indexOf(':}')>-1 || msg.indexOf(':{')>-1) {
        fillSmiley(msg)
        msg=fillSmiley.msg;
    }
    var dt=new Date();
    var time=dt.getHours()+":"+dt.getMinutes()+" "+dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear();
    var date=new Date();
   var timeStamp=""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
    var senderName=members["sh"+value.id].name;
    var chatString='<div class="col-sm-12 col-lg-12 col-md-12"><div style="background-color: white;width: 75%;opacity:1;border-radius: 4px;display: table;position: inherit;padding: 5px;color: black;margin-bottom: 10px;padding: 3px 0px;" class="popover fade right">  <div class="popover-content"><h7 class="" style="font-family: \'Raleway\', sans-serif;color: rgb(139, 115, 115);font-weight: 600;">'+senderName+'</h7><legend style="margin-bottom: 8px;border-bottom: 1px solid rgb(223, 222, 220);"></legend>'+'<span style="word-break: break-all;">'+msg+'</span><legend style="margin-top: 8px;margin-bottom: 8px;border-bottom: 1px dashed rgb(223, 222, 220);"></legend><span class="pull-right" style="color:rgb(152, 142, 123);">'+time+'</span></div><div class="arrow" style=""></div></div></div>';
    var chatmsgObj={};
    chatmsgObj.msg=chatString;
    chatmsgObj.senderId=value.id;
    chatmsgObj.timeStamp=timeStamp;
    msgArray.push(chatmsgObj);
        if(msgArray.length>5){
            msgArray.splice(0,1);
        }
    socket.broadcast.emit('chatMsg',chatString);
    });
};