var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});
//signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", "Someone with that username already exists!");
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You're logged in");
            res.redirect("/movies");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});
// handling login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/movies",
    failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/movies");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;