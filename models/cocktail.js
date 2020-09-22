const { DataTypes }= require('sequelize')
const db =require('../db.config')

const Cocktail = db.define('Cocktail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    },
})
module.exports = Cocktail
