//load bcrypt
var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'npm',
            passwordField: 'password', 
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, npm, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    npm: npm
                }
            }).then(function(user) {
                if (user)
                {
                    return done(null, false, {
                        message: 'That npm is already taken'
                    });
                }else
                {
                    var userPassword = generateHash(password);
                    var data =
                        {
                            npm: npm,
                            password: userPassword,
                            nama: req.body.nama,
                            jenis_kelamin: req.body.jenis_kelamin,
                            semester: req.body.semester,
                            no_hp: req.body.no_hp,
                            prodi: req.body.prodi,
                            tanggal_lahir: req.body.tanggal_lahir,
                        };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.npm);
    });
    // deserialize user 
    passport.deserializeUser(function(npm, done) {
        User.findById(npm).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        }); 
    });
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'npm',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, npm, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    npm: npm
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'NPM does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                } 
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}