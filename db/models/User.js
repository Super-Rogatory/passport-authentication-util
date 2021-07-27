const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING
    }
});

module.exports = User;