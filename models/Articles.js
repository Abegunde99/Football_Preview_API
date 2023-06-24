const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    fixture: {
        type: String,   
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Articles', articlesSchema);