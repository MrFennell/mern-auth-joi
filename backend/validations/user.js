import Joi from '@hapi/joi';

const message = 'Password must be between 6-16 characters, ' +
    'have at least one capital letter, ' +
    'one lowercase letter, one digit, ' +
    'and one special character';

export const signUp = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

     password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
        .error(new Error(message))
})

export const signIn = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});