const express = require('express');
const { mongoose } = require('mongoose');
const Task = mongoose.model("Task");
const router = express.Router();
const validateTaskInput = require('../../validation/task');

// get all tasks for a user by userId
router.get("/project/:projectId", async (req, res, next) => {
    try {
        const tasks = await Task
            .find({ project: req.params.projectId })
            // if creator is stored in object id form, we will need to use the following
            // .find({ creator: Schema.Types.ObjectId(req.params.userId) })
            .sort({ priority: -1 });
        return res.json(tasks);
    }
    catch (_err) {
        const err = new Error(_err.message);
        err.statusCode = 404;
        return next(err);
    }
})



//create a task
router.post('/', validateTaskInput, async (req, res, next) => {
    try {
        const newTask = new Task({
            creator: req.body.creator,
            project: req.body.project,
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            priority: req.body.priority,
            completed: req.body.completed,
        })
        let task = await newTask.save()
        return res.json(task)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;
