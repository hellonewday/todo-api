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

router.get("/:commentId", (req, res) => {
  Comment.findOne({ _id: req.params.commentId })
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
router.post("/:todoId", (req, res) => {
  var data = Comment({
    content: req.body.content,
    todo: req.params.todoId
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
router.patch("/:commentId", (req, res) => {
  Comment.updateOne({ _id: req.params.commentId }, { $set: req.body })
    .exec()
    .then(() =>
      res.status(200).json({
        message: "Updated!"
      })
    )
    .catch(err => {
      res.status(400).json({
        message: "Error",
        error: err
      });
    });
});
router.delete("/:commentId", (req, res) => {
  Comment.deleteOne({ _id: req.params.commentId })
    .exec()
    .then(() => {
      res.status(200).json({
           message: 'Deleted!'
      });
    }).catch(err =>{
         res.status(400).json({
              message: 'Error',
              error: err
         })
    });
});
module.exports = router;
