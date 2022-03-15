const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get('/movies/create', async (req, res) => {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie.hbs', { celebrities }); 
});

router.post('/movies/create', async (req, res) => {
    try {
        const newMovie = new Movie({ ...req.body });
        await newMovie.save();
        res.redirect("/movies");
      } catch (err) {
        console.error(err);
        res.redirect("/movies/create");
      }
});

module.exports = router;