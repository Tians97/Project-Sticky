// const express = require('express')
// const {
//     createProject
// } = require('../../controllers/projectController')
// const router = express.Router()


const express = require('express')
const { mongoose } = require('mongoose')
const Project = mongoose.model("Project")
const router = express.Router()

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
        const err = new Error(_err.message)
        err.statusCode = 404;
        return next(err)
    }
})

//get a single project
router.get('/:id', async (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ err }))
})



//create a new project
// router.post('/', createProject)



//delete a project



//update a project

module.exports = router