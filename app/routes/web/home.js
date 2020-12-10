const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');

// Home Routes
router.get('/' , homeController.index);

router.get('/logout' , (req ,res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});

router.post('/contactUs',homeController.contactUs);
router.get('/thanks' , homeController.thanks);

module.exports = router;