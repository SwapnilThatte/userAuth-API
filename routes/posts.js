const router = require('express').Router()
const verify = require('./varifyToken')
const User = require('../model/user')

router.get('/', verify, (req, res) => {
    res.send(`User ID: ${User.findById({_id : req.user})}`)
})

module.exports = router