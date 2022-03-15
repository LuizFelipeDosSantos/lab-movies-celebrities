const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
const mongoose = require("mongoose");

// all your routes here
router.get("/movies", async (req, res) => {
  const allmovies = await Movie.find();
  res.render("movies/movies.hbs", { allmovies });
});

router.get("/movies/create", async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie.hbs", { celebrities });
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    res.redirect("/movies/create");
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = mongoose.Types.ObjectId(req.params.id);
    const movie = await Movie.findById(movieId);
    await movie.populate('cast');
    res.render("movies/movie-details.hbs", {movie});
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
