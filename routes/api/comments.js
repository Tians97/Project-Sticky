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



module.exports = router;