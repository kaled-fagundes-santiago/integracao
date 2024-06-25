const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/message');
const sequelize = require('./database/mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(messageRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
