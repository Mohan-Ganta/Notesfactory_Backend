const router = require('express').Router()
const purchases = require('../Models/Purchase')

router.get('/getorders',(req,res)=>{
    purchases.find()
    .then(orders=>{
        res.send(orders)
    })
    .catch(err=>res.status(404).send(err))
})

module.exports = router