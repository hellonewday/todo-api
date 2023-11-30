let express = require("express");
let router = express.Router();
let Label = require("../model/Label");

router.get("/", (req, res) => {
  Label.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        count: doc.length,
        data: doc.map((item) => {
          return {
            id: item._id,
            name: item.name,
            color: item.color,
          };
        }),
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error",
        error: error,
      });
    });
});

router.post("/", (req, res) => {
  let data = new Label({
    name: req.body.name.trim(),
    color: req.body.color,
  });

  data
    .save()
    .then((doc) => {
      res.status(201).json({
        data: {
          id: doc._id,
          name: doc.name,
          color: doc.color,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error",
        error: error,
      });
    });
});

router.delete("/:id", (req, res) => {
  Label.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        id: doc._id,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error",
        error: error,
      });
    });
});

module.exports = router;
