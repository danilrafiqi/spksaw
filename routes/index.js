var express = require('express');
var crypto = require('crypto');
var User = require('../databases/models').User;
var Auth_mdw = require('../middlewares/auth');

var router = express.Router();
var secret = 'codepolitan';
var session_store;

router.get('/',  function(req, res, next) {
  session_store = req.session;
  res.render('home', { 
  	title: 'Codepolitan Express.js Blog Series', 
  	session_store:session_store,
  	layout:false
  });
});

router.get('/admin/login', function(req, res, next) {
  res.render('adminsignin',{
  	layout:false
  });
});

router.post('/admin/login', function(req, res, next) {
  session_store = req.session;
  var password = crypto.createHmac('sha256', secret)
                   .update(req.body.password)
                   .digest('hex');

  if (req.body.username == ""  || req.body.password == "")
  {
      // req.flash('info', 'Punten, tidak boleh ada field yang kosong!');
      res.redirect('/admin/login');
  }
  else 
  {
      User.findOne({where:{ username: req.body.username, password:password }})
      	.then(function(user) {
      // if (err) throw err;
	      console.log('ini adalah'+user.admin);
	      if (user.admin >0 ){
	          session_store.username = user.username;
	          session_store.email = user.email;
	          session_store.admin = user.admin;
	          session_store.logged_in = true;

	          res.redirect('/dashboard');
	      }
	      else{
	          // req.flash('info', 'Sepertinya akun Anda salah!');
	          res.redirect('/admin/login');
	      }
    	})
  } 
});

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/login');
    }
  });
});

router.get('/secret', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
  session_store = req.session;
  res.render('index', { session_store:session_store });
});



module.exports = router;
