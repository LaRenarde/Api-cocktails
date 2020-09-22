const { DataTypes }= require('sequelize')
const db = require('../db.config')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    nom:{
        type: DataTypes.STRING
    },
    prenom:{
        type: DataTypes.STRING
    }
})


module.exports = User