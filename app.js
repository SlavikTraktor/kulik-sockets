var express = require("express");
var path = require("path");
var listen = require("./server");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res, next) {
  res.render("index", {
    res: JSON.stringify(listen.ports())
  });
});

module.exports = app;
