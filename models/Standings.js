const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true
    },
    team: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        logo: {
            type: String
        }
    },
    points: {
        type: Number
    },
    goalsDiff: {
        type: Number
    },
    group: {
        type: String
    },
    form: {
        type: String
    },
    status: {
        type: String
    },
    description: {
        type: String
    },
    all: {
        played: {
            type: Number
        },
        win: {
            type: Number
        },
        draw: {
            type: Number
        },
        lose: {
            type: Number
        },
        goals: {
            for: {
                type: Number
            },
            against: {
                type: Number
            }
        }
    },
    home: {
        played: {
            type: Number
        },
        win: {
            type: Number
        },
        draw: {
            type: Number
        },
        lose: {
            type: Number
        },
        goals: {
            for: {
                type: Number
            },
            against: {
                type: Number
            }
        }
    },
    away: {
        played: {
            type: Number
        },
        win: {
            type: Number
        },
        draw: {
            type: Number
        },
        lose: {
            type: Number
        },
        goals: {
            for: {
                type: Number
            },
            against: {
                type: Number
            }
        }
    },

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Standing', standingSchema);