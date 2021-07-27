# FreeCodeCamp - User Authentication of Web Apps | First Hour

## Express Middleware
```
const express = require('express');

const app = express();

const firstMiddleware = (req, res, next) => {
    console.log('I am a middleware #1');
    next();
}

const secondMiddleware = (req, res, next) => {
    console.log('I am a middleware #2');
    next();
}
app.use(firstMiddleware);
app.use(secondMiddleware);


app.get('/', (req, res, next) => {
    console.log('I am the main express middleware');
    res.send('<h1>Hello World</h1>');
});


app.listen('8080', () => console.log('listening on port 8080'));
```
- ### Fairly standard stuff, just know that order matters. app.use() sets up our first and second middleware. Note, they don't execute immediately. They will not execute until a specific route is handled by our express server. They will execute in order from .use() to .get().
- ### Output
```
I am a middleware #1
I am a middleware #2
I am the main express middleware
```

## Express Middleware Error Handling
```
const firstMiddleware = (req, res, next) => {
    try {
        console.log('I am a middleware #1');
        throw new Error('Yeah hey, just trying to say, middleware 1 is a whole error bro.');
    } catch (err) {
        next(err);
    }
    
}

const secondMiddleware = (req, res, next) => {
    console.log('I am a middleware #2');
    // next();
}
app.use(firstMiddleware);
app.use(secondMiddleware);


app.get('/', (req, res, next) => {
    console.log('I am the main express middleware');
    res.send('<h1>Hello World</h1>');
});

app.use((err, req, res, next) => {
    if(err) {
        res.send('<h1>An error has occurred</h1>')
    }
})
```

# Express Session 
- ### Sessions are like cookies on steriods. 
- ### Normal cookies contain information that is stored in the browser and sent to every HTTP request.
- ### Sessions **store** larger amounts of data, including user credentials and other private information. This data can be stored in memory or server side.
- ### Visit -> https://www.npmjs.com/package/express-session for more session({ options }) .

## We need to install connect-pg-simple
- ### Then we need to create the session table in the database via
`psql <name_of_db> < node_modules/connect-pg-simple/table.sql`
- ### Once that is created we can add it as the value to the store key in the session object.
```
const session = require('express-session');
const PostgresStore = require('connect-pg-simple')(session);
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new PostgresStore({
        conString: 'postgres://super-rogatory@localhost:5432/tutorial_db'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
```

- ### If everything is setup correctly. See should be able to see our session table in the psql client.
- ### On top of that, **we should be able to see our connect.sid** in the storage tab when your page loads.

## This is what it looks like in psql. We have now connected out backend to the frontend
```
               sid                |                                                  sess                                                  |       expire        
----------------------------------+--------------------------------------------------------------------------------------------------------+---------------------
 NEgwxtperpsApeGaNTi-WfLR5aWB2GAJ | {"cookie":{"originalMaxAge":86400000,"expires":"2021-07-28T01:53:51.913Z","httpOnly":true,"path":"/"}} | 2021-07-27 18:53:53
```

## **NOTE:** We now have a session object in our request object. 
```
app.get("/", (req, res, next) => {
  console.log("I am the main express middleware");
  if(req.session.viewCount) {
      req.session.viewCount += 1;
  } else {
      req.session.viewCount = 1;
  }
  res.send(`<h1>You have visited this page ${req.session.viewCount} amount of times </h1>`);
});
```

## In psql, modification to session objects PERSIST.
```
               sid                |                                                         sess                                                         |       expire        
----------------------------------+----------------------------------------------------------------------------------------------------------------------+---------------------
 NEgwxtperpsApeGaNTi-WfLR5aWB2GAJ | {"cookie":{"originalMaxAge":86400000,"expires":"2021-07-28T02:10:34.360Z","httpOnly":true,"path":"/"},"viewCount":5} | 2021-07-27 19:10:35
```


