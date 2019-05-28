var express = require("express");
var router = express.Router();
var List = require("../model/List");
router.get("/", (req, res) => {
  List.find()
    .select("title")
    .exec()
    .then(doc => {
      res.json({
        count: doc.length,
        data: doc
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Error",
        error: err
      });
    });
});
router.get("/:itemId", (req, res) => {
  List.findById({ _id: req.params.itemId })
    .select("title description")
    .exec()
    .then(doc => {
      res.status(200).json({
        data: doc
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});
router.get("/:itemId", (req, res) => {
  List.find({ _id: req.params.itemId })
    .exec()
    .then(doc => {
      res.status(200).json({ data: doc });
    })
    .catch(err => {
      res.status(400).json({ message: "Error", error: err });
    });
});
router.post("/", (req, res) => {
  var data = new List({
    title: req.body.title,
    description: req.body.description
  });
  data
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).json({
        data: doc
      });
    })
    .catch(err => {
      res.status(200).json({
        message: "Error",
        error: err
      });
    });
});

router.delete("/:itemId", (req, res) => {
  List.findByIdAndDelete({ _id: req.params.itemId })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});
module.exports = router;
