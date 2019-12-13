var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var seachData = req.query.search;
  var url = "http://omdbapi.com/?s=" + seachData + "&apikey=thewdb";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      res.render("results", { parsedData: parsedData });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("The server has started!");
});
