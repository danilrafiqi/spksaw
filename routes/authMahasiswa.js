var authController = require('../controllers/authController');

var express = require('express')
var router = express.Router();
var passport = require('passport');

router.get('/signup', authController.signup);
router.get('/signin', authController.signin);

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signout',
        failureRedirect: '/signup'
    }
));

router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/mahasiswa',
        failureRedirect: '/signin'
    }
));

router.get('/signout',authController.signout);


module.exports = router;