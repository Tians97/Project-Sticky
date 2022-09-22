const express = require('express');
const { mongoose } = require('mongoose');
const Comment = mongoose.model("Comment")
const router = express.Router();
const validateCommentInput = require('../../validation/comment');

// get all comments for a task by taskId
router.get("/task/:taskId", async (req, res, next) => {
    try {
        const comments = await Comment
            .find({ task: req.params.taskId })
            console.log("debug   aaaa", comments)
        return res.json(comments);
    }
    catch (_err) {
        const err = new Error(_err.message);
        err.statusCode = 404;
        return next(err);
    }
})

// create a comment
router.post('/', validateCommentInput, async (req, res, next) => {
    try {
        const newComment = new Comment({
            body: req.body.body,
            creator: req.body.creator,
            task: req.body.task
        })
        let comment = await newComment.save()
        return res.json(comment)
    }
    catch (err) {
        next(err)
    }
})

// delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        return res.json(comment)
    }
    catch (err) {
        res.status(404).json({ nocommentfound: "No comment found with that ID" })
    }

})


// update a comment
router.patch('/:id', validateCommentInput, async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const comment = await Comment.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { returnDocument: "after" })

    if (!comment) {
        return res.status(400).json({ error: "Failed to update, comment does not exist" })
    }

    res.status(200).json(comment)
})



module.exports = router;