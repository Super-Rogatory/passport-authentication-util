const express = require('express');

const app = express();

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

app.listen('8080', () => console.log('listening on port 8080'));