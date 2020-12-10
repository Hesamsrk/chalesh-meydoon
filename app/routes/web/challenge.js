const express = require('express');
const router = express.Router();

// Controllers
const ChallengeController = require('app/http/controllers/challenge/challengeController');


// Helpers
const {uploadImage} = require('app/helpers/uploadImage');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField')


// validators 
const challengeValidator = require('app/http/validators/challengeValidator');
// challenge Routes
router.get('/' , ChallengeController.showChallengeList)

router.get('/create' , ChallengeController.showCreateForm)
router.post('/create' ,uploadImage.single('cover'), convertFileToField.handle,challengeValidator.handle(), ChallengeController.saveChallengeProcess)

router.get('/show/:id' , ChallengeController.showChallenge)
router.get('/follow/:id' , ChallengeController.follow)
router.get('/addPost/:id' , ChallengeController.addPost)

module.exports = router;