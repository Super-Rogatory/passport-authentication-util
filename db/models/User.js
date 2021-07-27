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
// Needed to actually create the User table.
// const seed = async () => {
//     try {
//         await db.sync();
//         console.log('Created User Table');
//     } catch (err) {
//         console.log('Something went wrong');
//     }
// }

// seed();
module.exports = User;