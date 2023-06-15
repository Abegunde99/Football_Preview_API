const express = require('express');
const router = express.Router();
const {getStandings, getStandingsByLeague}  = require('../controllers/standings-controller');


router.get('/', getStandings);
router.get('/:group', getStandingsByLeague);

module.exports = router;