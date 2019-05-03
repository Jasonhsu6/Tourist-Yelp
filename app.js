var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Tourground = require("./models/tourground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/yelp_tour_v6", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

// passport configuration
app.use(require("express-session")({
    secret: "I always want a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get('', function(req, res){
    res.render("landing");
});




// RESTful routes: 
// INDEX - show all the tourgrounds
app.get("/tourgrounds", function(req, res){
    // res.render("tour", {tourgrounds: tourgrounds});
    Tourground.find({}, function(err, alltourgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("tourgrounds/index", {tourgrounds: alltourgrounds, currentUser: req.user});
        }
    });
});

// RESTful routes
// Create - add new tourground to DB
app.post("/tourgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newtour = {name: name, image: image, description: desc};
    // tourgrounds.push(newtour);
    // create a new tourground and save to the DB
    Tourground.create(newtour, function(err, newlycreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/tourgrounds");
        }
    });
});

// RESTful route
// NEW - display a new form for adding new tourgrounds
app.get("/tourgrounds/new", function(req, res){
    res.render("tourgrounds/new");
});

// RESTful route
// SHOW - show info about one tourground
// be sure to put NEW in front of SHOW
app.get("/tourgrounds/:id", function(req, res){
    // find the tourground with provided ID
    Tourground.findById(req.params.id).populate("comments").exec(function(err, foundtour){
        if (err){
            console.log(err);
        } else {
            console.log(foundtour);
            res.render("tourgrounds/show", {tourground: foundtour});
        }
        
    });
    // render show template with that tourground 
})



// =============================================================================================
// Comments routes

app.get("/tourgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Tourground.findById(req.params.id, function(err, foundtour){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {tourground: foundtour}); 
        }
    })
});

app.post("/tourgrounds/:id/comments", isLoggedIn, function(req, res){
    // lookup the tour according to ID
    // create a new comment
    // connect new comment to tour
    // redirect to showpage
    Tourground.findById(req.params.id, function(err, foundtour) {
        if (err){
            console.log(err);
            res.redirect("/tourgrounds")
        } else {
            Comment.create(req.body.comment, function(err, newlycomment){
            if (err){
                console.log(err);
            } else {
                foundtour.comments.push(newlycomment);
                foundtour.save();
                res.redirect("/tourgrounds/" + foundtour._id);
            }
        });
        }
    });
});

// ============================================================
// author routes

// show register form
app.get("/register", function(req, res) {
    res.render("register");
})

// handle sign up logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/tourgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

// add logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/tourgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server started");
})