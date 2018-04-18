var express = require('express');
var router = express.Router();
var kriteria = require('../databases/models').Kriteria;
var con = require('../databases/db');

var Auth_mdw = require('../middlewares/auth');

router.use(Auth_mdw.check_login, Auth_mdw.is_admin)

/* GET users listing. */
router.get('/', function(req, res, next) {
	sql1 = "SELECT npm, MAX(IPK) as ipk, MAX(`Jumlah Piagam`) as piagam, MAX(`Penghasilan Orang Tua`) as penghasilan, MAX(`Jabatan dalam Organisasi`) as jabatan, MAX(`Nilai Kedisiplinan`) as kedisiplinan FROM NilaiAlternatif";
	  // con.query(`${sql1};${sql2}`, function (err, result, fields) {
	  //   if (err) throw err;
	  //   res.render('perhitungan/index',{
	  //   	hitung:result[0],
	  //   	nilai:result[1]
	  //   });
	  //   a = result[0];
	  //   b = a[0].ipk;
	  // });

	con.query(`${sql1};`, function (err, result, fields) {
		ripk = result[0].ipk;
		rpeng = result[0].piagam;
		rpiag = result[0].penghasilan;
		rjab = result[0].jabatan;
		rkeds = result[0].kedisiplinan;	
		console.log(rkeds);					
		//sql2 = `SELECT npm, (IPK / ${ripk}) , (`+"`Jumlah Piagam`"+`/ ${rkeds}) as Piagam, (`+"`Penghasilan Orang Tua`" +`/ ${rpeng}) as Penghasilan, (`+"`Jabatan dalam Organisasi`" +`/ ${rjab}) as Jabatan, (`+`Nilai Kedisiplinan`+`/ ${rkeds}) as Kedisiplinan FROM NilaiAlternatif;`;  
	    sql2 =`SELECT npm, (IPK / ${ripk}) as IPK , (`+"`Jumlah Piagam`"+`/ ${rpiag}) as Piagam, (`+"`Penghasilan Orang Tua`" +`/ ${rpeng}) as Penghasilan, (`+"`Jabatan dalam Organisasi`" +`/ ${rjab}) as Jabatan,  (`+"`Nilai Kedisiplinan`"+`/ ${rkeds}) as Kedisiplinan FROM NilaiAlternatif`;
	    sql3 = "SELECT npm, IPK as n_ipk, `Jumlah Piagam` as n_piagam, `Penghasilan Orang Tua` as n_penghasilan, `Jabatan dalam Organisasi` as n_jabatan, `Nilai Kedisiplinan` as n_kedisiplinan FROM NilaiAlternatif";
	    sql4 = "SELECT * from Kriteria";
	    if (err) throw err;
		// con.query(`${sql2};${sql3};`, function (err, result2, fields) {
		//     if (err) throw err;
		//     res.render('perhitungan/index',{
		//     	nilai:result2[0],
		//     	nilaiawal:result2[1]
		//     });
		//     console.log(result2[0])
		// });


		con.query(`${sql4};`, function (err, result3, fields) {
			b_ipk = result3[0].bobot;
			b_piagam = result3[1].bobot;
			b_penghasilan = result3[2].bobot;
			b_jabatan = result3[3].bobot;
			b_kedisiplinan = result3[4].bobot;
			sql5 =`SELECT npm, ((IPK / ${ripk})*${b_ipk}) as IPK , ((`+"`Jumlah Piagam`"+`/ ${rpiag})*${b_piagam}) as Piagam, ((`+"`Penghasilan Orang Tua`" +`/ ${rpeng})*${b_penghasilan}) as Penghasilan, ((`+"`Jabatan dalam Organisasi`" +`/ ${rjab})*${b_jabatan}) as Jabatan,  ((`+"`Nilai Kedisiplinan`"+`/ ${rkeds})*${b_kedisiplinan}) as Kedisiplinan, `;
			sql5 +=`(((IPK / ${ripk})*${b_ipk}) + ((`+"`Jumlah Piagam`"+`/ ${rpiag})*${b_piagam}) + ((`+"`Penghasilan Orang Tua`" +`/ ${rpeng})*${b_penghasilan}) + ((`+"`Jabatan dalam Organisasi`" +`/ ${rjab})*${b_jabatan}) + ((`+"`Nilai Kedisiplinan`"+`/ ${rkeds})*${b_kedisiplinan})) as nilai_akhir FROM NilaiAlternatif`;
		    if (err) throw err;
			con.query(`${sql2};${sql3};${sql5};`, function (err, result2, fields) {
			    if (err) throw err;
			    res.render('perhitungan/index',{
			    	nilai:result2[0],
			    	nilaiawal:result2[1],
			    	rank : result2[2]
			    });
			    console.log(result2[2])
			});
		});


	});
});

module.exports = router;
