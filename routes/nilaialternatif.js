var express = require('express');
var router = express.Router();
var kriteria = require('../databases/models').Kriteria;
var con = require('../databases/db');
var Auth_mdw = require('../middlewares/auth');

router.use(Auth_mdw.check_login, Auth_mdw.is_admin)
/* GET users listing. */
router.get('/', function(req, res, next) {
	  con.query("SELECT * FROM NilaiAlternatif", function (err, result, fields) {
	    if (err) throw err;
	    res.render('nilaialternatif/index',{
	    	nilai:result
	    });
	    console.log(result)
	  });
});

module.exports = router;
