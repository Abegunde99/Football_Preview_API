const mongoose = require('mongoose');

const roundsSchema = new mongoose.Schema({
    league: {
        type: String,
        required: true
    },
    currentRound: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rounds', roundsSchema);