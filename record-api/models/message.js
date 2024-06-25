const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userIdSend: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userIdReceive: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'messages',
    timestamps: true
});

module.exports = Message;
