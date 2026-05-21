const express = require("express");

const Task = require("../models/Task");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const { title, description, projectId } = req.body;

    const task = new Task({
      title,
      description,
      projectId,
    });

    await task.save();

    res.status(201).json({
      message: "Task Created",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/:projectId", async (req, res) => {

  try {

    const tasks = await Task.find({
      projectId: req.params.projectId,
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.put("/update/:id", async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Task Updated",
      updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;