var express = require("express");
var router = express.Router();
var List = require("../model/List");
var Comment = require("../model/Comment");
var moment = require("moment");
// Configuration
moment.locale("vi");
// Get all the todo item
router.get("/", (req, res) => {
  List.find()
    .exec()
    .then(doc => {
      res.json({
        count: doc.length,
        data: doc.map(item => {
          return {
            id: item._id,
            title: item.title,
            description: item.description,
            created: moment(item.created).format("LLLL"),
            fromNow: moment(item.created).fromNow(),
            likes: item.likes,
            URL: `${req.protocol}://${req.hostname}/lists/${item._id}`,
            method: req.method
          };
        })
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Error",
        error: err
      });
    });
});
// Get the item of the todo-list
router.get("/:itemId", (req, res) => {
  List.findById({ _id: req.params.itemId })
    .exec()
    .then(doc => {
      res.json({
        data: {
          id: doc._id,
          title: doc.title,
          description: doc.description,
          created: moment(doc.created).format("LLLL"),
          fromNow: moment(doc.created).fromNow(),
          likes: doc.likes,
          URL: `${req.protocol}://${req.hostname}/lists/${doc._id}`,
          method: req.method
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Error",
        error: err
      });
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
router.patch("/:itemId", (req, res, next) => {
  List.updateOne({ _id: req.params.itemId }, { $set: req.body })
    .exec()
    .then(doc => {
      res.status(200).json({
        data: doc
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "error",
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
//get the comments of the todo item:
router.get("/comments/:itemId", (req, res) => {
  Comment.find({ todo: req.params.itemId })
    .exec()
    .then(doc => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item._id,
            content: item.content,
            created: moment(item.created).format("LLLL"),
            fromNow: moment(item.created).fromNow(),
            likes: item.likes,
            URL: `${req.protocol}://${req.hostname}/lists/${item._id}`,
            method: req.method
          };
        })
      });
    })
    .catch(err => {
      res.json(400).json({
        message: "Error",
        error: err
      });
    });
});
module.exports = router;
