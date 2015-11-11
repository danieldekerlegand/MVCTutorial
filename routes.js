var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function (req, res){
  res.render('index',{ user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { message: req.flash('error') });
});

router.post('/login', 
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;