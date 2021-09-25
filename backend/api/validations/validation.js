const Joi = require('@hapi/joi');   

const registerValidation = (data) => {
    const UserValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        pincode:Joi.number().min(4).required(),
        phoneNumber: Joi.string().min(4).required()
    })
    return UserValidationSchema.validate(data);
}

const loginValidation = (data) => {
    const UserLoginValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        pincode : Joi.number().min(4).required(),
    })
    return UserLoginValidationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
