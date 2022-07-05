'use strict'

const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const snippetSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    content: Joi.string()
});

const queryIdSchema = Joi.object({
    id: Joi.string().required()
});

const snippetsPostValidator = async (req, res, next) => {
    try {
        await snippetSchema.validateAsync(req.body);
    }
    catch (error) {
        console.error(`Error during the validation of the POST body: ${JSON.stringify(error.message)} stack ${JSON.stringify(error.stack)}`);
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
    next();
};

const snippetsPatchValidator = async (req, res, next) => {
    try {
        await snippetSchema.validateAsync(req.body);
        await queryIdSchema.validateAsync(req.query);
    } catch (error) {
        console.error(`Error during the validation of the PATCH request: ${JSON.stringify(error.message)} stack ${JSON.stringify(error.stack)}`);
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
    next();
};

const snippetsDeleteValidator = async (req, res, next) => {
    try {
        await queryIdSchema.validateAsync(req.query);
    } catch (error) {
        console.error(`Error during the validation of the Delete request: ${JSON.stringify(error.message)} stack ${JSON.stringify(error.stack)}`);
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
    next();
};

module.exports = {
    snippetsPostValidator,
    snippetsPatchValidator,
    snippetsDeleteValidator
}