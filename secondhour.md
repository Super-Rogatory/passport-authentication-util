# Passport Local Strategy

## Create a .env file to store private information
- ### Can store database string (conString)
- ### Can store secret
## Requiring dotenv will give us access to variables set in the .env file via 'process.env.VARIABLE_NAME'.
- ### NOTE: You want to install dotenv and require path as well.
- ### You also want to add .env to .gitignore
`require('dotenv').config()`
## OR
`require('dotenv').config({ path: path.resolve(__dirname, '../.env') });`

## **We made a WHOLE bunch of changes in between, consult GitHub for commit related to boilerplate.**

## In our passport.js we need to define a strategy, this strategy takes a verify callback as an argument.
```
const verifyCallback = async (username, password, done) => {
    // passport looks for username and password from req.body on a particular post request
    // username is the value that we receive from the req.body of some login form.
    try {
        const user = await User.findOne({ where: { name: username }});
        if(!user) return done(null, false); // if there is no user in the database, instruct passport to return 401.

        const isValid = validPassword(password, user.hash, user.salt); // puts password through verification function.
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
```
## Now in our routes, we can add the passport middleware with the local strategy for our login route handler.
`router.post('/login', passport.authenticate('local'), (req, res, next) => {});`

- ### We make a POST request to login
- ### That request gets intercepted by the passport middleware
- ### Then passport populates the username and password variables in the verify callback.
- ### Function runs, look up user in database, validate Passwword, etc.
- ### If all goes well, our passport middleware will resolve control to the next middleware in the sequence...letting us in the route.
## RECALL: IN app.js, we required in the configuration at require('../config/passport'); This pushes passport.use() into the middleware sequence in a specific route handler that we specify.

# Hash
- ### Recall that, given the same hash function, we should get the same hash.
- ### When we generate password we want to use some hashfunction to hash the passwword with respect to a salt
- ### This gives us a hashed password.
- ### When it comes time to verify we can utilize the same hash function.
```
const crypto = require('crypto');

function validatePassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash: genHash
    }
}
module.exports = { validatePassword, generatePassword };
```

# Register | Login Routes
```
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success'}));
router.post("/register", async (req, res, next) => {
  try {
    const saltHash = generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await User.create({
      name: req.body.username,
      hash,
      salt,
    });
    await User.sync();
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});
```

# Validate Password | Generate Password
```
const crypto = require('crypto');

function validatePassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash: genHash
    }
}
module.exports = { validatePassword, generatePassword };
```

# Passport
```
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/User');
const validatePassword = require('../lib/passwordUtils').validatePassword;


const verifyCallback = async (username, password, done) => {
    // passport looks for username and password from req.body on a particular post request
    // username is the value that we receive from the req.body of some login form.
    try {
        const user = await User.findOne({ where: { name: username }});
        if(!user) return done(null, false); // if there is no user in the database, instruct passport to return 401.

        const isValid = validatePassword(password, user.hash, user.salt); // puts password through verification function.
        if(isValid) {
            return done(null, user); // if login credentials are valid, redirect to successRedirect
        } else {
            return done(null, false); // redirects to failureRedirect
        }
    } catch (err) {
        done(err);
    }
}
const strategy = new LocalStrategy(verifyCallback);

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
```