const express = require("express");

const Comment = require("../models/Comment");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const { text, taskId } = req.body;

    const comment = new Comment({
      text,
      taskId,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment Added",
      comment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/:taskId", async (req, res) => {

  try {

    const comments = await Comment.find({
      taskId: req.params.taskId,
    });

    res.status(200).json(comments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;