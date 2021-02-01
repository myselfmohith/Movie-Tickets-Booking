const Movie = require("../../models/SchmasforDatabase");

function parsetoDate(entryDate) {
  let xyz = new Date();
  xyz.setHours(0, 0, 0, 0);
  let y = entryDate.split("-");
  xyz.setFullYear(y[0], y[1] - 1, y[2]);
  return xyz;
}

module.exports.parsetoDate = parsetoDate;

async function addnewMovie(mname, murl, mfdate, mtdate, mshows) {
  let addmovie = {};
  addmovie.movieName = mname;
  addmovie.imageURL = murl;
  addmovie.fromDate = mfdate;
  addmovie.toDate = mtdate;
  addmovie.numberofshows = mshows;
  addmovie.totalDays = [];
  const showtimigArray = [
    "11:00 AM",
    "2:30 PM",
    "7:30 PM",
    "10:30 PM",
    "5:00 AM",
  ];
  let startDate = parsetoDate(mfdate);
  const endDate = parsetoDate(mtdate);
  while (startDate <= endDate) {
    let tdate = {};
    let dateset = startDate;
    tdate.date = dateset.toDateString();
    tdate.shows = [];
    for (var i = 0; i < mshows; i++) {
      var cshow = {};
      cshow.showTime = showtimigArray[i];
      cshow.bookedSeats = [];
      tdate.shows.push(cshow);
    }
    addmovie.totalDays.push(tdate);
    startDate.setDate(startDate.getDate() + 1);
  }
  await new Movie(addmovie).save();
}

module.exports.addnewMovie = addnewMovie;
