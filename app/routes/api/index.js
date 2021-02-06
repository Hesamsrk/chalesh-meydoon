const express = require('express');
const ChallengeController = require('app/http/controllers/api/challengeController');
const router = express.Router();

router.get('/api/challenges' , ChallengeController.getChallenges);

module.exports = router;