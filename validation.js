// User Validation for Registration
const Joi = require('joi')
registerValidation = user => {
    const JoiSchema = Joi.object({
        name : Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password : Joi.string().min(6).required()
    }).options({abortEarly : false})

    return JoiSchema.validate(user)
}

// User Validation for Login
loginValidation = user => {
    const JoiSchema = Joi.object({
        email: Joi.string().min(6).required(),
        password : Joi.string().min(6).required()
    }).options({abortEarly : false})

    return JoiSchema.validate(user)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation