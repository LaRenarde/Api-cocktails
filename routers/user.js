// CHARGEMENT DES MODULES
const express = require('express')
const { route } = require('./cocktail')


// RECUPERATION DU ROUTER D EXPRESS
var router = express.Router()

// MIDLEWARE LOG
router.use(function timelog(req, res, next){
    const event = new Date();
    console.log("Time USERS:", event.toString())
    next()
})

// ROUTAGE RESSOURCE USER
router.get('/index', (req, res) => {
    return res.json({ data: ' INDEX USER'})
})

router.post('/add', (req, res) => {
    return res.json({ data: ' AJOUT USER'})
})

router.put('/edit', (req, res) => {
    return res.json({ data: ' MODIFIER USER'})
})

router.delete('/delete/:user_id', (req, res) => {
    return res.json({ data: ' SUPPRIMER USER'+ user_id})
})

module.exports = router