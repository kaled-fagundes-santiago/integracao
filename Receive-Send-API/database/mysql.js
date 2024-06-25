const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teste', 'user1', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
