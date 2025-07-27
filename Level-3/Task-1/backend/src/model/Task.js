const mongoose = require("mongoose")


const taskSchema = mongoose.Schema(
     {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            required: false, 
        },
        completed: {
            type: Boolean,
            default: false, 
        },
    },
    {
        timestamps: true, 
    }
)

module.exports = mongoose.model('Task', taskSchema)

