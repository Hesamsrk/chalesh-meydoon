const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const ChallngeController = require('app/http/controllers/challenge/challengeController');


// Helpers
const {uploadImage} = require('app/helpers/uploadImage');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField')


// validators 
const challengeValidator = require('app/http/validators/challengeValidator');
mv = (req,res,next)=>{
    res.json(req.body)
}
// challenge Routes
router.get('/' , ChallngeController.showChallngeList)
router.get('/create' , ChallngeController.showCreateForm)
router.post('/create' ,uploadImage.single('cover'), convertFileToField.handle,challengeValidator.handle(), ChallngeController.saveChallengeProcess)
module.exports = router;