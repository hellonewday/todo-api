var express = require("express");
var router = express.Router();
var Comment = require("../model/Comment");
var List = require("../model/List");

//Get all the comments!
router.get("/", (req, res) => {
  Comment.find()
    .exec()
    .then(doc => {
      res.status(200).json({
        data: doc
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Error occured",
        error: err
      });
    });
});

router.get("/:postId", (req, res) => {
  Comment.findOne({ _id: req.params.postId })
    .populate("todo", "title")
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
//send a comment to a specific todo list:
router.post("/:postId", (req, res) => {
  var data = Comment({
    content: req.body.content,
    todo: req.params.postId
  });
  data
    .save()
    .then(doc =>
      res.status(201).json({
        data: doc
      })
    )
    .catch(err => {
      res.status(400).json({
        message: "Error occured",
        error: err
      });
    });
});

module.exports = router;
