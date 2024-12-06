const mongoose = require('mongoose')

const ideaSchema = new mongoose.Schema({
    text:{
        type:String,
        reuired: [true, 'please enter a text field']

    },
    tag: {
        type: String
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date, // Date type field
        default: () => {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Removes the time part
        },
        set: (value) => {
            const date = new Date(value);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Ensures no time is stored
        },
    },
    
})

module.exports = mongoose.model('idea',ideaSchema)