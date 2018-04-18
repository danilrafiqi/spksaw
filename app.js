var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//new
var hbs = require('hbs');
var methodOverride = require('method-override');
var passport   = require('passport')
var session    = require('express-session')
var Mahasiswa = require('./databases/models').Mahasiswa;

require('./config/passport/passport.js')(passport, Mahasiswa);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kriteria = require('./routes/kriteria');
var nilaikriteria = require('./routes/nilaikriteria');
var authMahasiswa = require('./routes/authMahasiswa');
var Mahasiswa = require('./routes/mahasiswa');
var nilaialternatif = require('./routes/nilaialternatif');
var perhitungan = require('./routes/perhitungan');
var dashboard = require('./routes/dashboard');


var app = express();


// view engine setup
hbs.registerPartials(__dirname + '/views/layouts');
hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

hbs.registerHelper("multimath", function(lvalue, operator, rvalue, nvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

hbs.registerHelper("total", function (t,u,v,w,x){
	var hasil= 0;
	hasil = t+u+v+w+x;
	return hasil;
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//pasport
app.use(session({ secret: 'bismillah',resave: true, saveUninitialized:true})); 
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kriteria', kriteria);
app.use('/nilaikriteria', nilaikriteria);
app.use('/', authMahasiswa);
app.use('/mahasiswa', Mahasiswa);
app.use('/nilaialternatif', nilaialternatif);
app.use('/perhitungan', perhitungan);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
