const express = require("express");

const Project = require("../models/Project");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
    });

    await project.save();

    res.status(201).json({
      message: "Project Created",
      project,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const projects = await Project.find();

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Project Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;