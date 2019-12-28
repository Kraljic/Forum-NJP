const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    validateRequestId: function (req, res, next) {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send({ error: 'Invalid id provided' });

        next();
    },

    validateRegisterRequest: function (req, res, next) {
        const schema = {
            username: Joi
                .string()
                .trim()
                .min(4)
                .max(45)
                .required(),
            email: Joi
                .string()
                .trim()
                .email()
                .max(64)
                .required(),
            password: Joi
                .string()
                .min(8)
                .max(64)
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateLoginRequest: function (req, res, next) {
        const schema = {
            username: Joi
                .string()
                .trim()
                .required(),
            password: Joi
                .string()
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateProfileRequest: function (req, res, next) {
        const schema = {
            firstName: Joi
                .string()
                .trim()
                .max(45)
                .allow('')
                .optional(),
            lastName: Joi
                .string()
                .trim()
                .max(45)
                .allow('')
                .optional(),
            bio: Joi
                .string()
                .trim()
                .max(255)
                .allow('')
                .optional()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateSectionRequest: function (req, res, next) {
        const schema = {
            title: Joi
                .string()
                .trim()
                .max(64)
                .required(),
            description: Joi
                .string()
                .trim()
                .max(255)
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateCategoryRequest: function (req, res, next) {
        const schema = {
            title: Joi
                .string()
                .trim()
                .max(64)
                .required(),
            description: Joi
                .string()
                .trim()
                .max(255)
                .required(),
            section: Joi
                .string()
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateThreadRequest: function (req, res, next) {
        const schema = {
            title: Joi
                .string()
                .trim()
                .max(128)
                .required(),
            threadText: Joi
                .string()
                .trim()
                .min(10)
                .max(2048)
                .required(),
            category: Joi
                .string()
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateThreadPutRequest: function (req, res, next) {
        const schema = {
            threadText: Joi
                .string()
                .trim()
                .min(10)
                .max(2048)
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },

    validateCommentRequest: function (req, res, next) {
        const schema = {
            commentText: Joi
                .string()
                .trim()
                .min(1)
                .max(1024)
                .required(),
            thread: Joi
                .string()
                .required(),
            commentParent: Joi
                .string()
                .optional()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    },
    
    validateCommentPutRequest: function (req, res, next) {
        const schema = {
            commentText: Joi
                .string()
                .trim()
                .min(1)
                .max(1024)
                .required()
        };

        const validatin = Joi.validate(req.body, schema);
        if (validatin.error)
            return res.status(400).send({ error: validatin.error.details[0].message });

        next();
    }
}

