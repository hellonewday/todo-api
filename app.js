var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var listRoute = require("./routes/lists");

mongoose.connect(
  "mongodb+srv://quochung5c:quochung5c@cluster0-4veva.gcp.mongodb.net/todo?retryWrites=true",
  {
    useNewUrlParser: true
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send(
    "<ol>API routes for this server:<li>GET: /lists</li><li>GET: /lists/{itemId}</li><li>POST: /lists</li><li>DELETE /lists/{itemId}</li></ol>"
  );
});
app.use("/lists", listRoute);

module.exports = app;
