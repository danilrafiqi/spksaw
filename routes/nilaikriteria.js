var express = require('express');
var router = express.Router();
var kriteria = require('../databases/models').NilaiKriteria;
var con = require('../databases/db');
var Auth_mdw = require('../middlewares/auth');

router.use(Auth_mdw.check_login, Auth_mdw.is_admin)

/* GET users listing. */
router.get('/', function(req, res, next) {
	  con.query("SELECT * FROM Kriteria", function (err, result, fields) {
	    if (err) throw err;
	    res.render('nilaikriteria/index',{
	    	kriteria:result
	    });
	  });
});


router.get('/detail/:id', function(req, res, next) {
	  con.query("SELECT * FROM Kriteria;SELECT *,namaKriteria FROM `NilaiKriteria` INNER JOIN Kriteria on NilaiKriteria.idKriteria = Kriteria.idKriteria WHERE NilaiKriteria.idKriteria = "+req.params.id, function (err, results, fields) {
	    if (err) throw err;
	    res.render('nilaikriteria/index',{
	    	kriteria:results[0],
	    	nilaikriteria:results[1]
	    });
	  });
});

router.get('/add', function(req, res, next) {
	con.query("SELECT * FROM Kriteria", function (err, result, fields) {
		if (err) throw err;
		res.render('nilaikriteria/add',{
			kriteria:result
		});
	});
});

router.post('/add', function(req, res, next) {
  con.query("INSERT INTO NilaiKriteria SET ?", req.body, function (err, result, fields) {
    if (err) throw err;
    res.redirect('/nilaikriteria')
  });
});

router.get('/edit/:id', function(req, res, next) {
	con.query("SELECT *,namaKriteria FROM `NilaiKriteria` INNER JOIN Kriteria on NilaiKriteria.idKriteria = Kriteria.idKriteria WHERE NilaiKriteria.idNilaiKriteria = "+req.params.id, function (err, result, fields) {
		if (err) throw err;
		res.render('nilaikriteria/edit',{
			nilaikriteria:result
		});
		console.log(result);
	});
});

router.put('/edit/:id', function(req, res, next) {
	var sql = "UPDATE NilaiKriteria SET ? WHERE idNilaiKriteria ="+req.params.id;	
	con.query(sql, req.body,function (err, result, fields) {
		if (err) throw err;
		res.redirect('/nilaikriteria')
	});
});

router.delete('/delete/:id', function(req, res, next) {
	var sql = "DELETE FROM `NilaiKriteria` WHERE `NilaiKriteria`.`idNilaiKriteria` = "+req.params.id;	
	con.query(sql,function (err, result, fields) {
		if (err) throw err;
		res.redirect('/nilaikriteria')
	});
});

module.exports = router;
