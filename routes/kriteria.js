var express = require('express');
var router = express.Router();
var kriteria = require('../databases/models').Kriteria;
var con = require('../databases/db');
var Auth_mdw = require('../middlewares/auth');

router.use(Auth_mdw.check_login, Auth_mdw.is_admin)
/* GET users listing. */
router.get('/', function(req, res, next) {
	  con.query("SELECT * FROM Kriteria", function (err, result, fields) {
	    if (err) throw err;
	    res.render('kriteria/index',{
	    	kriterias:result
	    });
	  });
});

router.get('/add', function(req, res, next) {
	res.render('kriteria/add');
});

router.post('/add', function(req, res, next) {
	con.query("ALTER TABLE `NilaiAlternatif` ADD `"+req.body.namaKriteria+"` VARCHAR(255) NOT NULL;");
	  con.query("INSERT INTO Kriteria SET ?", req.body, function (err, result, fields) {
	    if (err) throw err;
	    res.redirect('/kriteria')
	  });
});

router.get('/edit/:id', function(req, res, next) {
	  con.query("SELECT * FROM Kriteria WHERE idKriteria ="+req.params.id, function (err, result, fields) {
	    if (err) throw err;
	    res.render('kriteria/edit',{
	    	kriterias:result
	    });
	    console.log(result);
	  });
});
router.put('/edit/:id', function(req, res, next) {
	var sql = "UPDATE Kriteria SET ? WHERE idKriteria ="+req.params.id;	
	con.query(sql, req.body,function (err, result, fields) {
		if (err) throw err;
		res.redirect('/kriteria')
	});
});

router.delete('/delete/:id', function(req, res, next) {
	var sql1 = "SELECT * FROM Kriteria WHERE idKriteria ="+req.params.id;
	con.query(sql1, function(err, result, fields){
		namaKri = result[0].namaKriteria;
		var sql3 = "ALTER TABLE `NilaiAlternatif` DROP `"+namaKri+"`;"
		con.query(sql3);
	});
	//console.log('halo dunia'+namaKri);
	var sql2 = "DELETE FROM `Kriteria` WHERE `Kriteria`.`idKriteria` = "+req.params.id;	
	con.query(sql2,function (err, result, fields) {
		if (err) throw err;
		res.redirect('/kriteria')
	});
});

module.exports = router;
