// CHARGEMENT DES MODULES
const express = require('express')

// CHARGEMENT DU MODEL NEWSLETTER 

const Newsletter = require('../models/newsletter')



// RECUPERATION DU ROUTER D EXPRESS
var router = express.Router()


// MIDLEWARE LOG
router.use(function timelog(req, res, next){
    const event = new Date();
    console.log("Time NEWSLETTER :", event.toString())
    next()
})

// ROUTAGE RESSOURCE NEWSLETTER

router.get('/index', (req, res) => {
    return res.json({ data: ' INDEX COCKTAIL'})
})

router.post('/add', (req, res) => {
    return res.json({ data: ' AJOUT COCKTAIL'})
})

router.delete('/delete/:cocktail_id', (req, res) => {
    return res.json({ data: ' SUPPRIMER COCKTAIL'+ cocktail_id})
})

module.exports = router