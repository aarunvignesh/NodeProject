/**
 * Created by EMD on 5/4/2015.
 */
var restler=require('restler');
var mainSocket=require('./mainSocket').mainSocket();
module.exports=function(){
    setInterval(function(){
        var options={
            method:"GET",
            query:"id=829779",
            header:{"Content-type":"application/json","Accept":"application/json"}
        };
        restler.get('http://cricscore-api.appspot.com/csa',options).once('complete',function(data,res){
            if(res.rawEncoded){
                mainSocket.sockets.emit("cricScore",res.rawEncoded);
            }
        });
    },5000);
};