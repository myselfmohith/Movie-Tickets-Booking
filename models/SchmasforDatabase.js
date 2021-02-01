const mongoose = require("mongoose");

const showBookings = mongoose.Schema({
    showTime: { type: String, required: true },
    noofBookedTickets: {type: Number,default: 0},
    bookedSeats: [String]
});

const showDates = mongoose.Schema({
    date: { type: String, required: true },
    shows: [showBookings]
});

const movieSchema = mongoose.Schema({
    movieName: { type: String, required: true },
    imageURL: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    numberofshows: { type: Number, required: true },
    totalDays: [showDates]
});

module.exports = mongoose.model('movie', movieSchema);