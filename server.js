// CHARGEMENT DES ROUTAGES
const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')


//FICHIER DE ROUTAGE
var cocktail_router = require('./routers/cocktail')
var user_router = require('./routers/user')
var newsletter_router = require('./routers/newsletter')


//CONNEXION A LA BASE DE DONNEES
var db = require('./db.config');


//INITIALISATION DU SERVEUR ET MIDLEWARE
const app = express()

app.use(cors())                                 //Activation du cors
app.use(morgan('tiny'))                         //Activation du Morgan pour les logs
app.use(express.json())                         //Activation du raw(json)
app.use(express.urlencoded({extended: true}))   //Activation de x-www-form-urlencoded

// LIAISON SERVER <=> ROUTER
app.use('/newsletter', newsletter_router)
app.use('/user', user_router)
app.use('/cocktail', cocktail_router)
app.get('*', (req, res) => {
    return res.status(404).send('What the hell are you doing !!! ')
})


// START SERVEUR
db.authenticate()
    .then(() => {
        console.log('connexion etabli avec la base de données Mysql/MariaDb')
    })
    .then (() => {
        app.listen(process.env.SERVER_PORT, () => {
        console.log('The serveur is running. Have fun !')
        })
    })
    .catch(err => {
        console.log('erreur de la connexion à la bdd :', err)
    })
