const mongoose = require('mongoose');
const fixtureId = Math.floor(Math.random() * 1000000);

const customFixturesSchema = new mongoose.Schema({
    fixture: {
        id: {
            type: Number,
            default: fixtureId
        }
    },
    homeTeam: {
        type: String,
    },
    awayTeam: {
        type: String,
    },
    homeTeamLogo: {
        type: String,
    },
    awayTeamLogo: {
        type: String,
    },
    competition: {
        type: String,
    },
    dateAndTime: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('CustomFixtures', customFixturesSchema);
