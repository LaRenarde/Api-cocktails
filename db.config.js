const { Sequelize } = require('sequelize')
const UserModel = require('./models/user')

var sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        
        pool:{
            max: 5,
            min: 0,
            idle: 10000 
        }
    }
)

const User = UserModel(sequelize, Sequelize)

module.exports = { sequelize, User }