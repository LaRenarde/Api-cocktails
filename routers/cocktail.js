// CHARGEMENT DES MODULES
const express = require('express')

// CHARGEMENT DU MODEL USER
const Cocktail = require('../models/cocktail')


// RECUPERATION DU ROUTER D EXPRESS
var router = express.Router()


// MIDLEWARE LOG
router.use(function timelog(req, res, next){
    const event = new Date();
    console.log("Time  COCKTAILS:", event.toString())
    next()
})

// ROUTAGE RESSOURCE COCKTAILS

router.get('/index', (req, res) => {
    return res.json({ data: ' INDEX COCKTAIL'})
})

router.post('/add', (req, res) => {
    return res.json({ data: ' AJOUT COCKTAIL'})
})

router.put('/edit', (req, res) => {
    return res.json({ data: ' MODIFIER COCKTAIL'})
})

router.delete('/delete/:cocktail_id', (req, res) => {
    return res.json({ data: ' SUPPRIMER COCKTAIL'+ cocktail_id})
})

module.exports = router