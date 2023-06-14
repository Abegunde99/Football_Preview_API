const express = require('express');
const router = express.Router();
const {getStandings, getStandingsByLeague}  = require('../controllers/standings-controller');


router.get('/', getStandings);
router.get('/:league', getStandingsByLeague);

module.exports = router;