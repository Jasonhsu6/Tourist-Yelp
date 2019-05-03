var express = require("express");
var router = express.Router();
var Tourground = require("../models/tourground");
// RESTful routes: 
// INDEX - show all the tourgrounds
router.get("/tourgrounds", function(req, res){
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
router.post("/tourgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newtour = {name: name, image: image, description: desc, author: author};
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
router.get("/tourgrounds/new", function(req, res){
    res.render("tourgrounds/new");
});

// RESTful route
// SHOW - show info about one tourground
// be sure to put NEW in front of SHOW
router.get("/tourgrounds/:id", function(req, res){
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

module.exports = router;