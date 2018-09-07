var express = require("express");
var router  = express.Router();
var Movie = require("../models/movies");

router.get("/movies", function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/index",{movies:allMovies});
        }
    });
});

//CREATE - ADD NEW MOVIES TO DB
router.post("/movies", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovie = {name: name, image: image, description: desc, author:author}
    //CREATE A NEW MOVIE TO DB
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("error", "Please Login First");
            res.redirect("/movies");
        }
    });
});

router.get("/movies/new", isLoggedIn, function(req, res) {
    res.render("movies/new")
});

//SHOW - shows more info about one campground
router.get("/movies/:id", function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            console.log(foundMovie);
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

//Edit movie
router.get("/movies/:id/edit", checkOwner, function(req, res) {
    //is user logged in
        Movie.findById(req.params.id, function(err, foundMovie){
            res.render("movies/edit", {movie: foundMovie});
    });
});

//Update
router.put("/movies/:id", checkOwner, function(req, res){
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
        if(err){
            res.redirect("/movies");
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    });
});

//destroy
router.delete("/movies/:id", checkOwner, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/movies");
        }
    });
});

//middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkOwner(req, res, next){
    if(req.isAuthenticated()){
        Movie.findById(req.params.id, function(err, foundMovie){
            if(err){
                res.redirect("/movies");
            } else {
                 //does user own movie
                if(foundMovie.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;