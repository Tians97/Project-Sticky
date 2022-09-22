const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project"
        },
        title: {
            type: String,
            require: [true, 'Please add a title']
        },
        body: {
            type: String,
        },
        userId: {
            type: String,
            required: true
        },
        projectId: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            require: [true, 'Please add a deadline']
        },
        priority: {
            type: Number,
            require: [true, 'Please select priority']
        },
        completed: {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true
    }   
)

module.export = mongoose.model("Task", taskSchema);