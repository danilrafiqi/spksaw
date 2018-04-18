var express = require('express');
var router = express.Router();
var kriteria = require('../databases/models').Kriteria;
var con = require('../databases/db');
var Auth_mdw = require('../middlewares/auth');

router.use(Auth_mdw.check_login, Auth_mdw.is_admin)
/* GET users listing. */
router.get('/', function(req, res, next) {
	sql1 = "SELECT COUNT(*) as jumlah FROM `Mahasiswas`";
	sql2 = "SELECT COUNT(*) as jumlah FROM `Mahasiswas` WHERE status = 1";
	sql3 = "SELECT COUNT(*) as jumlah FROM `Mahasiswas` WHERE status = 0";
	sqlbyprodi = "SELECT prodi, COUNT(*) as jumlah FROM `Mahasiswas` GROUP BY prodi";
	sqlbyipk = "SELECT COUNT(*) as jumlah, IPK FROM `NilaiAlternatif` GROUP BY IPK";
	sqlsemester = "SELECT semester,COUNT(*) as jumlah FROM `Mahasiswas` GROUP BY semester";	
	  con.query(`${sql1};${sql2};${sql3};${sqlbyprodi};${sqlbyipk};${sqlsemester};`, function (err, result, fields) {
	    if (err) throw err;
	    res.render('dashboard/index',{
	    	jumlah:result[0],
	    	jumlah_pilih:result[1],
	    	jumlah_belum:result[2],
	    	by_prodi:result[3],
	    	by_ipk:result[4],
	    	by_semester:result[5],
	    });
	  });
});

module.exports = router;
