const express = require('express');
const router = express.Router();

// Middlewares
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');

// Admin Router
const adminRouter = require('app/routes/web/admin');
router.use('/admin' , redirectIfNotAdmin.handle , adminRouter);

// Home Router
const homeRouter = require('app/routes/web/home');
router.use('/' , homeRouter);

// Auth Router
const authRouter = require('app/routes/web/auth');
router.use('/auth' , redirectIfAuthenticated.handle ,authRouter);
 
// Challenge Router
const challengeRouter = require('app/routes/web/challenge');
router.use('/cl',redirectIfNotAuthenticated.handle,challengeRouter);
const notFound = require('app/routes/web/notFound');
router.use(/[\s\S]*/,notFound)
module.exports = router;