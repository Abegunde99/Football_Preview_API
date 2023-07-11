const express = require('express');
const router = express.Router();
const { getFixtures, getFixturesByLeague, getFixturesByGameWeek, getFixturesById, postFixtures , updateFixtures, deleteFixtures, getFixturesByCompetition, getHomeOutsideFixtures} = require('../controllers/fixtures-controller');
const multer = require('../utils/multer');
const {protect} = require('../middlewares/auth');


router.get('/fixtures', getFixtures);
router.get('/fixture/:id', getFixturesById);
router.get('/fixtures/:league', getFixturesByLeague);
router.get('/fixtures/:league/:gameweek', getFixturesByGameWeek);
router.post('/fixtures', protect, multer.array('image'), postFixtures);
router.put('/fixtures/:id', protect, multer.array('image'), updateFixtures);
router.delete('/fixtures/:id', protect, deleteFixtures);
router.get('/competition/fixtures/:competition', getFixturesByCompetition);
router.get('/homeoutside/fixtures', getHomeOutsideFixtures);

module.exports = router;