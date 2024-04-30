const zod = require('zod');

const signupValidator = zod.object({
    password: zod.string().min(6),
    firstName: zod.string().max(30),
    lastName: zod.string().max(30),
    email: zod.string().email(),
});

const signinValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

const updateUserValidator = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

module.exports = { signupValidator, signinValidator, updateUserValidator };