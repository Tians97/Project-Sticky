const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        title: {
            type: String,
            require: [true, 'Please add a title']
        },
        description: {
            type: String,
            require: [true, 'Please add a description']
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