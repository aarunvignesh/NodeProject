/**
 * Created by EMD-Sys7 on 4/23/15.
 */
var loginTime={};
module.exports.Login=function(req,res){

    if (req.isAuthenticated())
      res.redirect('/Profile');
    else
     res.render('Login',{message:req.flash("message")});
};
module.exports.loginSuccess=function(req,res){
   var date=new Date();
   var timeStamp=""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
    var id="sh"+req.user._id;
    if(loginTime[id]){
        res.redirect('/Logout');
    }
    else {
        loginTime[id] = timeStamp;
        res.redirect('/');
    }
};
module.exports.logout=function(req,res){
    var id="sh"+req.user._id;
    delete loginTime[id];
    req.logout();
    res.redirect('/Profile');
};
module.exports.profileView=function(req,res){
  var id="sh"+req.user._id;
  res.render('Profile',{user:req.user,loginTime:loginTime[id]});
};
module.exports.checkTime=function(req,res){
    var dt=new Date();
    res.send({date:dt.getHours()+":"+dt.getMinutes()+" "+dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear()});
};