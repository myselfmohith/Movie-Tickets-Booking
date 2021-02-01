const express = require("express");
const movieops = require("../public/Scripts - forOperations(exports Models)/newMovie_ops");
const route = express.Router();
const Movie = require("../models/SchmasforDatabase");

route.get("/", async (req, res) => {
    var movies = await Movie.find();
    res.render("editor/index",{movies:movies})
});

route.get("/newmovie", (req, res) => {
    res.render("editor/newmovie");
});

route.post("/", async (req, res) => {
    await movieops.addnewMovie(req.body.name,req.body.url,req.body.fromdate,req.body.todate,req.body.noofshows);
    res.redirect("/editor");
});

route.get("/delete/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/editor");
});

route.get("/edit/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("editor/editmovie",{movie:movie});
});

route.post("/edit/:id", async (req, res) => { 
    res.redirect("/editor");
})

module.exports = route;