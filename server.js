// Imports
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Theater', { useNewUrlParser: true, useUnifiedTopology: true });
const Movie = require("./models/SchmasforDatabase");

// Modules Imports -----------------------------

const editorroute = require("./routes/editor");
const movieroute = require("./routes/movie")

// ---------------------------------------------

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(require("express-ejs-layouts"));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Modules and Routers Uses --------------------------------

app.use("/editor", editorroute);
app.use("/movie", movieroute);

// ---------------------------------------------


// Render the Home Page
app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", {movies:movies});
});


app.listen(process.env.PORT || 3400);