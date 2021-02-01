const express = require("express");
const route = express.Router();
const Movie = require("../models/SchmasforDatabase");
const jsonlayout = JSON.stringify(require("../Database/seatscost.json"));
const open = require("open");


route.get("/:id/:date", async (req, res) => {
    const movie = await Movie.findById(req.params.id); 
    const cdate = await movie.totalDays.findIndex(ele => ele.date === req.params.date);
    const jsonf = JSON.parse(jsonlayout);
    res.render("moviedisplay",{movie:movie,cdate:cdate,totalseats:jsonf.totalseats})
});


route.get("/:id/:date/:showtime", async (req, res) => {
    let movie = await Movie.findById(req.params.id); 
    let cdate = await movie.totalDays.findIndex(ele => ele.date === req.params.date);
    let show = await movie.totalDays[cdate].shows.findIndex(ele => ele.showTime === req.params.showtime);
    res.render("fixedLayout/seatingLayout", { jsonlayout: jsonlayout, movie: movie, cdate: cdate, show: show });
})


route.get("/:id/:date/:showtime/:reseats", async (req, res) => {
    let movie = await Movie.findById(req.params.id); 
    let cdate = await movie.totalDays.findIndex(ele => ele.date === req.params.date);
    let show = await movie.totalDays[cdate].shows.findIndex(ele => ele.showTime === req.params.showtime);
    let seats = (req.params.reseats).split(",");
    if ([...new Set(seats.concat(movie.totalDays[cdate].shows[show].bookedSeats))].length == (movie.totalDays[cdate].shows[show].bookedSeats.length + seats.length)) {
        movie.totalDays[cdate].shows[show].bookedSeats = [...new Set(seats.concat(movie.totalDays[cdate].shows[show].bookedSeats))];
        movie.totalDays[cdate].shows[show].noofBookedTickets = movie.totalDays[cdate].shows[show].bookedSeats.length
        await movie.save();
    }
    else {
        res.send("<h1>Booking failed</h1>");
        return;
    }
    res.redirect(".");
});


route.get("/tester", (req, res) => {
    res.write('Hello');
    res.write('Man')
    res.end();
  });


module.exports = route;