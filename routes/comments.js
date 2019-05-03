var express = require("express");
var router = express.Router({mergeParams: true});
var Tourground = require("../models/tourground");
var Comment = require("../models/comment");

// =============================================================================================
// Comments routes

router.get("/new", isLoggedIn, function(req, res){
    Tourground.findById(req.params.id, function(err, foundtour){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {tourground: foundtour}); 
        }
    })
});

router.post("/", isLoggedIn, function(req, res){
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
                // add username and id to comment
                newlycomment.author.id = req.user._id;
                newlycomment.author.username = req.user.username;
                // save comment
                newlycomment.save();
                foundtour.comments.push(newlycomment);
                foundtour.save();
                res.redirect("/tourgrounds/" + foundtour._id);
            }
        });
        }
    });
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;
