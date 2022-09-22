const express = require('express');
const { mongoose } = require('mongoose');
const Task = mongoose.model("Task");
const router = express.Router();
const validateTaskInput = require('../../validation/task');

// get all tasks for a project by projectId
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

// get a single task
router.get('/:id', async (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ err }))
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

// delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        return res.json(task)
    }
    catch (err) {
        res.status(404).json({ notaskfound: "No task found with that ID" })
    }
})

//update a task
router.patch('/:id', validateTaskInput, async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { returnDocument: "after" })

    if (!task) {
        return res.status(400).json({ error: "Failed to update, task does not exist" })
    }

    res.status(200).json(task)
})


module.exports = router;
