const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/router');
const sequelize = require('./database/mysql');

const app = express();

app.use(bodyParser.json());
app.use(messageRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Failed to sync database:', err);
});

module.exports = app;
