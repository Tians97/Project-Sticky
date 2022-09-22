const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, 'Please add a title']
        },
        description: {
            type: String
        },
        deadline: {
            type: Date,
            require: [true, 'Please add a deadline']
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task',
            }
        ]
    },
    {
        timestamps: true
    }
)

projectSchema.index({ name: 1, title: 1 }) //mongoose 

module.export = mongoose.model("Project", projectSchema);