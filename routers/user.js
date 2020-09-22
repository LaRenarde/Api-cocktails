// CHARGEMENT DES MODULES
const express = require('express')
const jwt = require('jsonwebtoken')

// CHARGEMENT DU MODEL USER
const User = require('../models/user')


// RECUPERATION DU ROUTER D EXPRESS
var router = express.Router()

// MIDLEWARE LOG
router.use(function timelog(req, res, next){
    const event = new Date();
    console.log("Time USERS:", event.toString())
    next()
})


/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}


// ROUTAGE DU LOGIN
router.post('/login', (req, res)=> {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({ message : " Login ou mot de passe manquant", error: err})
    }
    User.findAll({ where: { username: req.body.username}})
        .then(result => {

            // Verification si l'utilisateur existe
            if(result.length === 0){
                return res.status(401).json({message : 'Compte inexistant'})
            }

            //MISE EN FORME DU RESULT
            var user = JSON.parse(JSON.stringify(result))[0]

            //VERIFICATION SI LE MOT DE PASSE EST BON
            if(user.password !== req.body.password){
                return res.status(400).json({message: "Mot de passe incorrect"})
            }

            // Création du token
            const token = jwt.sign({
                id: user.id,
                nom: user.nom, 
                prenom: user.prenom
            }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURING})
            return res.json({access_token : token })
        })
})


// ROUTAGE RESSOURCE USER
router.get('/index', checkTokenMiddleware, (req, res) => {
    const users = User.findAll()
    .then(users => {
        console.log(users)
        return res.json({data: users})
    })
    .catch(err => res.json({ message : 'DATABASE ERROR', error: err}))
})

router.post('/register', (req, res) => {
    const {nom, prenom, username, password} = req.body

    // VERIFICATION DES DONNEES RECUES
    if(!nom || !prenom || !username || !password){
        return res.status(400).json({ message : "Il manque un paramètre"})
    }
    
    // VERIFICATION SI L'UTILISATEUR EXISTE DEJA
    User.findAll({ where : {username : username}})
        .then(data => {
            if(data.length === 0 ){
                // TOUT VA BIEN, ajout de l'utilisateur dans la table users
                User.create(req.boby)
                    .then(user => res.json({ message : "User created"}))
                    .catch(err => res.json({ message : 'Database error', error: err}))
                return res.json({ message: 'test OK'}) //ici vide car pas de correspondance
            }else{
                return res.json({ message: 'test OK'}) // Le username existe deja dans la table
            }          
        })
        .catch(err => res.json({ message: 'Database error', error: err}))
    
})

router.put('/edit', (req, res) => {

    // VERIFIER SI LE CHAMPS ID EST PRESENT
    if(!req.body.id){
        return res.status(400).json({ message: "Informations manquantes, Laquelle ??"})
    }

    // Vérifier si il existe dans la table User
    User.findAll({ where : {id : req.body.id}})
    .then(user => {
        if(user.length !== 0 ){
            return res.json({ message: 'Utilisateur introuvable'}) // Le username existe deja dans la table
        }

            // TOUT VA BIEN, modification de l'utilisateur
        User.update(req.boby,{
            where : {id: req.body.id}
        })
        .then(user => res.json({ message : "User update"}))
        .catch(err => res.json({ message : 'Database error', error: err}))      
    })
    .catch(err => res.json({ message: 'Database error', error: err}))

})

// localhost:8081/user/delete/2
router.delete('/delete/:user_id', (req, res) => {
    User.destroy({ where : { id: req.params.user_id}})
    .then(() => {
        return res.json({ data: 'User deleted'})
    })
    .catch(err => res.json({ message: 'Database error', error: err}))
    
})

module.exports = router