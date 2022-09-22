// const express = require('express')
// const {
//     createProject
// } = require('../../controllers/projectController')
// const router = express.Router()


const express = require('express');
const { mongoose } = require('mongoose');
const Project = mongoose.model("Project");
const router = express.Router();
const validateProjectInput = require('../../validation/project');

//get all projects for a user by userId
router.get("/user/:userId", async (req, res, next) => {
    try {
        const projects = await Project
            .find({ creator: req.params.userId })
            // if creator is stored in object id form, we will need to use the following
            // .find({ creator: Schema.Types.ObjectId(req.params.userId) })
            .sort({ deadline: -1 });
        return res.json(projects)
    }
    catch (_err) {
        const err = new Error(_err.message);
        err.statusCode = 404;
        return next(err);
    }
})

//get a single project
router.get('/:id', async (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ err }))
})



//create a new project
router.post('/', validateProjectInput, async (req, res, next) => {
    try {
        const newProject = new Project({
            creator: req.body.creator,
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            members: req.body.members,
            tasks: req.body.tasks
        })
        
        let project = await newProject.save();
        return res.json(project);
    }
    catch (err) {
        next(err);
    }
})



//delete a project



//update a project

module.exports = router;