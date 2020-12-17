const express = require('express');
const router = express.Router();

// Controllers
const ChallengeController = require('app/http/controllers/challenge/challengeController');


// Helpers
const {UploadChallengeCover} = require('app/helpers/UploadChallengeCover');
const {uploadPostFile} = require('app/helpers/uploadPostFile');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField')


// validators 
const challengeValidator = require('app/http/validators/challengeValidator');
// challenge Routes
router.get('/' , ChallengeController.showChallengeList)

router.get('/create' , ChallengeController.showCreateForm)
router.post('/create' ,UploadChallengeCover.single('cover'), convertFileToField.handleCover,challengeValidator.handle(), ChallengeController.saveChallengeProcess)

router.get('/show/:id' , ChallengeController.showChallenge)
router.get('/follow/:id' , ChallengeController.follow)
router.get('/addPost/:id' , ChallengeController.showPostForm)
router.post('/addPost/:id' ,uploadPostFile.single('files'), convertFileToField.handleFiles,ChallengeController.addPost)
module.exports = router;