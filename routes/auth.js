const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const Validation = require('../validation')

// RESEUME FROM 37:24
// https://www.youtube.com/watch?v=2jqok-WgelI
router.post('/register', async (req, res) => {

    // Validating data before creating user
    const validationResponse = Validation.registerValidation(req.body)
    if(validationResponse.error) {
        res.status(400).send(validationResponse.error.details[0].message)
    }
    else {
        
        // Checking if the user is already in the database
        const emailExists = await User.findOne({email : req.body.email})
        if (emailExists) {
            res.status(400).send('User Already Exists')
        }


        else {
            // Hashing User Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)




            // Creating a new User
            const user = new User({
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword
            })
        
            try {
                const savedUser = await user.save()
                res.status(200).send({user : user._id})
            } 
            catch(err) {
                res.status(400).send(err)
            }
        }
    }

})

router.post('/login', async (req, res) => {
     const validationResponse = Validation.loginValidation(req.body)
    if(validationResponse.error) {
        res.status(400).send(validationResponse.error.details[0].message)
    }
    else {
        const user = await User.findOne({email : req.body.email})
        if (!user) {
            res.status(400).send('User Does Not Exist')
        }

        // Checking Password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).send('Invalid Password or Email')
        } 
        else {
            // Create and Assign JWT
            const token = jwt.sign({_id: user._id}, 'fhjsdhfbbvbrubfsub')
            res.header('auth-token', token).send(token)
            
          //  res.status(200).send('Logged in Successfully')
        }

    }
})

module.exports = router 