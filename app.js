const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const listRoute = require("./routes/lists");
const commentRoute = require("./routes/comments");
const labelRoute = require("./routes/labels");

mongoose.connect(
  "mongodb+srv://quochung5c:quochung5c@cluster0-4veva.gcp.mongodb.net/todo?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(__dirname));

app.use("/lists", listRoute);
app.use("/comments", commentRoute);
app.use("/labels", labelRoute);

module.exports = app;
