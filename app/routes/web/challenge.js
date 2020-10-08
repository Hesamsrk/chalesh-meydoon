const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const ChallngeController = require('app/http/controllers/challenge/challengeController');



// validators 
const challengeValidator = require('app/http/validators/challengeValidator');

// challenge Routes
router.get('/' , ChallngeController.showChallngeList)
router.get('/create' , ChallngeController.showCreateForm)
router.post('/create' ,challengeValidator.handle(), ChallngeController.saveChallengeProcess)
module.exports = router;