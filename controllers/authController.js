var con = require('../databases/db');
module.exports = {
	signup : function(req, res, next){
		//res.render('signup',{layout: false});
	  con.query("SELECT * FROM prodi", function (err, result, fields) {
	    if (err) throw err;
	    res.render('signup2',{
	    	prodi:result,
	    	layout:false
	    });
	  });		
	},
	signin : function(req, res, next) {
    	//res.render('signin',{layout: false});
    	res.render('signin',{
    		layout:false
    	});

	},
	dashboard : function(req, res, next) {
	    res.render('dashboard');
	},
	signout : function(req, res, next) {
	    req.session.destroy(function(err) {
	        res.redirect('/');
	    });
	}
};