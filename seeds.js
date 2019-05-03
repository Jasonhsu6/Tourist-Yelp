var mongoose = require("mongoose");
var Tourground = require("./models/tourground");
var Comment   = require("./models/comment");
 
var data = [
    {   name: "Washington Monument", 
        image: "https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/66045-istock-1008592778.jpg?itok=lpw1WVLO&resize=1100x1100",
        description: "Monument in the national mall, Washington.D.C"
    },
    {   name: "The Statue of Liberty", 
        image: "https://www.nps.gov/common/uploads/grid_builder/stli/crop16_9/89721987-1DD8-B71B-0BE77EEAE39E0520.jpg?width=950&quality=90&mode=crop",
        description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor in New York"
    },
    {   name: "Golden Gate Bridge", 
        image: "https://s3.amazonaws.com/dsg.files.app.content.prod/gereports/wp-content/uploads/2017/06/02135922/GettyImages-530755444-e1496426370542.jpg",
        description: "A suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean"
    },
]
 
function seedDB(){
   //Remove all campgrounds
   Tourground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all tourist attractions!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Tourground.create(seed, function(err, tourground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a new tourist attraction");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    tourground.comments.push(comment);
                                    tourground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;