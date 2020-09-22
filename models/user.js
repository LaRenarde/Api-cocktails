module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: type.STRING
        },
        password:{
            type: type.STRING
        },
        nom:{
            type: type.STRING
        },
        prenom:{
            type: type.STRING
        }
    })
}