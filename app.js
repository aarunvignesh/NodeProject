/**
 * Created by EMD-Sys7 on 4/23/15.
 */
var http=require('http');
var express=require('express');
var app=new express();
var body=require('body-parser');
var path=require('path');
var routes=require('./Routes');
var passport=require('passport');
var session=require('express-session');
var mongoose=require('mongoose');
var flash=require('connect-flash');
//var customSocket=require('./Shared/socketSetup.js');
var customSocket=require('./Shared/Socket/mainSocket.js');
//mongoose.connect("mongodb://127.0.0.1:27017/WebApp");db access

app.use(body.urlencoded());
app.use(body.json());
app.set('view engine','jade');
app.engine('html',require('ejs').renderFile);
app.set('Views',path.join(__dirname,'Views'));
app.use(session({ secret: 'Shiva', saveUninitialized: true, resave: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'Public')));
require("./Shared/Passport")(passport);


app.get('/',routes.Login);
app.get('/Profile',isLoggedIn,routes.profileView);
app.get('/loginSuccess',isLoggedIn,routes.loginSuccess);
app.post('/Login', passport.authenticate('local-signup', {
    successRedirect : '/loginSuccess',
    failureRedirect : '/',
    failureFlash : true
}));
app.post('/checkLogin', passport.authenticate('local-login', {
    successRedirect : '/loginSuccess',
    failureRedirect : '/',
    failureFlash : true
}));
app.get('/Logout',isLoggedIn,routes.logout);
app.get('/checkTime',isLoggedIn,routes.checkTime);

function isLoggedIn(req, res, next) {
 if (req.isAuthenticated())
        return next();
 res.redirect('/');
}
app.all('*', function (req, res, next) {
    if (req.isAuthenticated() || req.path == '/')
        res.redirect('/Profile');
    else
        res.redirect('/');
});
var server=app.listen(process.env.PORT||1272);
customSocket.create(server);
