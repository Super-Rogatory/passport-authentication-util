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