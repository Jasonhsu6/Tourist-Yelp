var express = require("express");
var router = express.Router();
var User = require("../models/users");
var passport = require("passport");
// ============================================================
// author routes

router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
    res.render("register");
})

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
        } else {
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/tourgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/tourgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

// add logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/tourgrounds");
});


// middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;