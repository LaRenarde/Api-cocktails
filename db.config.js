const { Sequelize } = require('sequelize')


var sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true,
        
        pool:{
            max: 5,
            min: 0,
            idle: 10000 
        }
    }
)

sequelize.sync()

module.exports = sequelize