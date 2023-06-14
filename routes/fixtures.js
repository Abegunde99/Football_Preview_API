const express = require('express');
const router = express.Router();
const { getFixtures, getFixturesByLeague } = require('../controllers/fixtures-controller');

router.get('/', getFixtures);
router.get('/:league', getFixturesByLeague);

module.exports = router;