const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
    fixture: {
        id: {
            type: Number
        },
        referee: {
            type: String
        },
        timezone: {
            type: String
        },
        date: {
            type: String
        },
        status: {
            long: {
                type: String
            },
            short: {
                type: String
            }
        }
    },
    league: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        country: {
            type: String
        },
        logo: {
            type: String
        },
        flag: {
            type: String
        },
        season: {
            type: Number
        },
        round: {
            type: String
        }
    },
    teams: {
        home: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            logo: {
                type: String
            },
            winner: {
                type: Boolean
            }
        },
        away: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            logo: {
                type: String
            },
            winner: {
                type: Boolean
            }
        }
    },
    goals: {
        home: {
            type: Number || null
        },
        away: {
            type: Number || null
        }
    },
    score: {
        halftime: {
            home: {
                type: Number || null
            },
            away: {
                type: Number || null
            }
        },
        fulltime: {
            home: {
                type: Number || null
            },
            away: {
                type: Number || null
            }
        }
    }
}, { timestamps: true });

//convert time to local time before saving to db
fixtureSchema.pre('save', function (next) {
    const date = new Date(this.fixture.date);
    this.fixture.date = date.toLocaleString();
    next();
});

module.exports = mongoose.model('Fixture', fixtureSchema);