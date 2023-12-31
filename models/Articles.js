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
    imageSource: {
        type: String,
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
    topArticle: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        required: true
    },
    publishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    custom: {
        type: Boolean,
    },
    views: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Articles', articlesSchema);