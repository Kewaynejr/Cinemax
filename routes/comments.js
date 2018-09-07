var express = require("express");
var router  = express.Router();
var Movie = require("../models/movies");
var Comment = require("../models/comment");

router.get("/movies/:id/comments/new", isLoggedIn, function(req, res) {
    // find movie by id
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {movie: movie});
        }
    });
});

router.post("/movies/:id/comments", isLoggedIn, function(req, res){
    //lookuo movie using id
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
            res.redirect("/movies");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    movie.comments.push(comment);
                    movie.save();
                    res.redirect("/movies/" + movie._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect to show page
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;
