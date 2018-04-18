var authController = require('../controllers/authController');

var express = require('express')
var router = express.Router();
var passport = require('passport');
var con = require('../databases/db');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else if(req.session.email){
    	return next();
    }
    console.log(req.session.email)
    res.redirect('/signin');
}
router.use(isLoggedIn);

/* GET users listing. */
router.get('/', function(req, res, next) {
	  
	ipk = "SELECT * from NilaiKriteria Where idKriteria = 1";
	piagam = "SELECT * from NilaiKriteria Where idKriteria = 2";
	penghasilan = "SELECT * from NilaiKriteria Where idKriteria = 3";
	jabatan = "SELECT * from NilaiKriteria Where idKriteria = 4";
	kedisiplinan = "SELECT * from NilaiKriteria Where idKriteria = 5";
	  con.query(`${ipk}; ${piagam};${penghasilan}; ${jabatan};${kedisiplinan}`, function (err, results, fields) {
	    if (err) throw err;
	    res.render('mahasiswa/isi',{
	    	r_npm : req.user,
	    	r_ipk:results[0],
	    	r_piagam:results[1],
	    	r_penghasilan:results[2],
	    	r_jabatan:results[3],
	    	r_kedisiplinan:results[4],	    		    		    	
	    });
	  });
});

router.post('/daftar', function(req, res, next) {
	  con.query("INSERT INTO NilaiAlternatif SET ?", req.body, function (err, result, fields) {
	    if (err) throw err;
	    res.redirect('/signout')
	  });
	  console.log(req.body)
});


module.exports = router;