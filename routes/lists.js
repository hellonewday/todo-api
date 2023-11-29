let express = require("express");
let router = express.Router();
let List = require("../model/List");
let Comment = require("../model/Comment");
let moment = require("moment");
// Configuration

function generateFindList(query) {
  if (query === null || query === undefined) {
    return List.find();
  } else {
    let obj = {};
    if (query.title !== null && query.title !== undefined) {
      obj = { ...obj, title: { $regex: query.title, $options: "i" } };
    }
    if (query.category !== null && query.category !== undefined) {
      obj = { ...obj, category: query.category };
    }
    if (query.progress !== null && query.progress !== undefined) {
      if (query.progress === "100") {
        obj = { ...obj, completed: true };
      } else if (query.progress === "50") {
        obj = { ...obj, progress: { $gt: 0, $lt: 100 } };
      } else {
        obj = { ...obj, progress: { $eq: 0 } };
      }
    }
    return List.find(obj);
  }
}

// Get all the todo item
router.get("/", (req, res) => {
  generateFindList(req.query)
    .populate("category", "name color")
    .exec()
    .then((doc) => {
      res.json({
        count: doc.length,
        data: doc.map((item) => {
          return {
            id: item._id,
            title: item.title,
            description: item.description,
            created: moment(item.created).format("LLLL"),
            updated: moment(item.updated).format("LLLL"),
            fromNow: moment(item.created).fromNow(),
            category: item.category,
            progress: item.progress,
            completed: item.completed,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});
// Get the item of the todo-list
router.get("/:itemId", (req, res) => {
  List.findById({ _id: req.params.itemId })
    .exec()
    .then((doc) => {
      res.json({
        data: {
          id: doc._id,
          title: doc.title,
          description: doc.description,
          created: moment(doc.created).format("LLLL"),
          updated: moment(item.updated).format("LLLL"),
          fromNow: moment(doc.created).fromNow(),
          category: doc.category,
          progress: doc.progress,
          completed: doc.completed,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  let data = new List({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    progress: parseInt(req.body.progress),
    completed: parseInt(req.body.progress) === 100 ? true : false,
  });
  data
    .save()
    .then(async (doc) => {
      let updatedTodo = await List.findById(doc._id)
        .populate("category", "name color")
        .exec();
      res.status(200).json({
        data: {
          id: updatedTodo._id,
          title: updatedTodo.title,
          description: updatedTodo.description,
          created: moment(updatedTodo.created).format("LLLL"),
          updated: moment(updatedTodo.updated).format("LLLL"),
          fromNow: moment(updatedTodo.created).fromNow(),
          category: updatedTodo.category,
          progress: updatedTodo.progress,
          completed: updatedTodo.completed,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error",
        error: err,
      });
    });
});
router.patch("/:itemId", (req, res, next) => {
  List.updateOne({ _id: req.params.itemId }, { $set: req.body })
    .exec()
    .then(async (doc) => {
      let updatedTodo = await List.findById(req.params.itemId)
        .populate("category", "name color")
        .exec();
      res.status(200).json({
        data: {
          id: updatedTodo._id,
          title: updatedTodo.title,
          description: updatedTodo.description,
          created: moment(updatedTodo.created).format("LLLL"),
          updated: moment(updatedTodo.updated).format("LLLL"),
          fromNow: moment(updatedTodo.created).fromNow(),
          category: updatedTodo.category,
          progress: updatedTodo.progress,
          completed: updatedTodo.completed,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "error",
        error: err,
      });
    });
});
router.delete("/:itemId", (req, res) => {
  List.findByIdAndDelete({ _id: req.params.itemId })
    .exec()
    .then((doc) => {
      res.status(200).json({
        id: doc._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});
//get the comments of the todo item:
router.get("/comments/:itemId", (req, res) => {
  Comment.find({ todo: req.params.itemId })
    .exec()
    .then((doc) => {
      res.status(200).json({
        counts: doc.length,
        data: doc.map((item) => {
          return {
            id: item._id,
            content: item.content,
            created: moment(item.created).format("LLLL"),
            updated: moment(item.updated).format("LLLL"),
            fromNow: moment(item.created).fromNow(),
          };
        }),
      });
    })
    .catch((err) => {
      res.json(400).json({
        message: "Error",
        error: err,
      });
    });
});
module.exports = router;
