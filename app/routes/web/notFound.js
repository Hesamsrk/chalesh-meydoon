const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');

// Home Routes
router.get('', (req,res)=>{
    res.render('home/404/index')
});



module.exports = router;