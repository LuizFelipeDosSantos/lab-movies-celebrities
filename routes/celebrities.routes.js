const async = require("hbs/lib/async");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here
router.get("/celebrities/create", async (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});
router.post("/celebrities/create", async (req, res) => {
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
    res.redirect("/celebrities/create");
  }
});
module.exports = router;
