const express = require("express");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const path = require("path");
const PostgresStore = require("connect-pg-simple")(session);

const app = express();

// Environment Variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Middleware for parsing and creating req.body
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));

// Connecting Express Session middleware to postgres database
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PostgresStore({
      conString: process.env.DB_STRING,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
}));

// Passport Authentication
require('../config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  //console.log(req.session); // created by the express session => session({options})
  //console.log(req.user); // created by the passport middleware
  next();
})
// Importing Routes
app.use(require('../routes'));

// Error Handling Middleware - doesn't exist yet


// Server Listens...
app.listen("8080", () => console.log("listening on port 8080"));
