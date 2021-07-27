const db = require('./database');
const onSuccess = () => console.log('Database connected...');
const onFailure = (err) => console.log('Error: ' + err + '| Failed to connect...');

db.authenticate()
    .then(onSuccess)
    .catch(onFailure);

// Connected to the database.