const express = require("express");
const path = require("path");
const WebSocket = require("ws");

const listen = require("./server");
const config = require("./config");

const app = express();

let expressWs = require("express-ws")(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res, next) {
  res.render("index", {
    res: JSON.stringify(listen.ports()),
    socketAdress: `${config.ip}:${config.port}`, 
  });
});

app.ws("/socket", function(ws, req, next) {});

listen.subscribe("test", () => {
  expressWs.getWss().clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(listen.ports()));
    }
  });
});

app.listen(config.port, function() {
  console.log("Started, port: 3000");
});

//module.exports = app;
