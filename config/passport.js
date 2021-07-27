const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/User');
const validatePassword = require('../lib/passwordUtils').validatePassword;
const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = async (username, password, done) => {
    // passport looks for username and password from req.body on a particular post request
    // username is the value that we receive from the req.body of some login form.
    try {
        const user = await User.findOne({ where: { name: username }});
        if(!user) return done(null, false); // if there is no user in the database, instruct passport to return 401.

        const isValid = validatePassword(password, user.hash, user.salt); // puts password through verification function.
        if(isValid) {
            return done(null, user); // if login credentials are valid, return callback
        } else {
            return done(null, false);
        }
    } catch (err) {
        done(err);
    }
}
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findByPk(userId);
        done(null, user);
    } catch (err) {
        done(err);
    }
})