var mongoose = require("mongoose");
var Movie = require("./models/movies");
var Comment = require("./models/comment");

var data = [
    {
        name:"Get Out",
        image: "https://resizing.flixster.com/DeLH7LVFf3I-nFanqlpKE9J-IJI=/206x305/v1.bTsxMjMyMjQzNDtqOzE3NzgyOzEyMDA7NTk3Ozk0Ng",
        description: "Rose Armitage is taking her boyfriend, Chris Washington, to meet her parents for the first time. He's a bit uneasy about how they'll treat him, as they're white and he's black. However, her parents turn out to be unfazed and everything seems to be going fine. Chris then starts to notice some weird behavioral traits with the African-American staff at the house. The Armitages throw a huge party and Chris ends up in some awkward conversations with the guests. Initially, he just puts it down to the racial difference, but then the guests', and Armitages', motives start to appear more sinister. Chris decides it is time to get out"
    },
    {
        name:"Jurassic Park",
        image: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
        description: "blah blah blah blah blah blah blah blah blah"
    },
    {
        name:"Inception",
        image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        description: "blah blah blah blah blah blah blah blah blah"
    }
]

function seedDB(){
    //REMOVE ALL MOVIES
    Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed movies");
                //ADD MOVIES
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added Movie")
                    //CREATE A COMMENT
                    Comment.create(
                        {
                            text: "This movie is amazing man!",
                            author: "Kevin"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                movie.comments.push(comment);
                                movie.save(); 
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;