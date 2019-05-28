var express = require("express");
var router = express.Router();
var List = require("../model/List");
var multer = require("multer");

// Configuration
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var fileFilter = function(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploads = multer({
  storage: storage,
  fileFilter: fileFilter
});
router.get("/", (req, res) => {
  List.find()
    .exec()
    .then(doc => {
      res.json({
        count: doc.length,
        data: doc.map(item => {
          return {
            id: doc._id,
            title: item.title,
            description: item.description,
            URL: `${req.protocol}://${req.hostname}/lists/${item._id}`,
            todoImage: `${req.protocol}://${req.hostname}/${item.todoImage}`,
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
router.get("/:itemId", (req, res) => {
  List.findById({ _id: req.params.itemId })
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
router.post("/", uploads.single("todoImage"), (req, res) => {
  var data = new List({
    title: req.body.title,
    description: req.body.description,
    todoImage: req.file.path
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
