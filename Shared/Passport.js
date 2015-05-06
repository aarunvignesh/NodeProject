/**
 * Created by EMD-Sys7 on 4/23/15.
 */
var User=require("./Users");
var LocalStrategy=require('passport-local').Strategy;
module.exports=function(passport){

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use('local-signup', new LocalStrategy(
    {
        passReqToCallback : true
    },
    function(req,username, password, done) {

        User.findOne({ 'username' :  username }, function(err, user) {

            if (err)
                return done(err,req.flash("message","Sorry.... Some error has occured...."));

            if (user) {
                return done(null, false,req.flash("message","Sorry....Username unavialable....."));
            } else {
                var newUser= new User();
                newUser.username    = username;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));
    passport.use('local-login', new LocalStrategy(
        {
            passReqToCallback : true
        },
        function(req,username, password, done) {

            User.findOne({ 'username' :  username }, function(err, user) {
                if (err)
                    return done(err,req.flash("message","Sorry.... Some error has occured...."));
                if (!user)
                    return done(null, false,req.flash("message","You have entered Invalid Username...."));
                if (!user.validPassword(password))
                    return done(null, false,req.flash("message","You have entered Incorrect Password...."));


                return done(null, user);
            });

        }));
}