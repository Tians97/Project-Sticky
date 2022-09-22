const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        body: {
            type: Text,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    },
    {
        timestamps: true
    }
)

module.export = mongoose.model("Comment", commentSchema);