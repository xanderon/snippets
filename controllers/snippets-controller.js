'use strict'

const { getById, create, update, remove } = require('../db/database');
const { baseSnippet, collections } = require('../utils/constants');
const { StatusCodes } = require('http-status-codes');

const snippetsGet = async (req, res, next) => {
    const snippet = await getById(req.query.id, collections.snippets);
    if (snippet === null) {
        return res.status(StatusCodes.NOT_FOUND).send(`The requested entity with id: ${req.query.id} was not found. Error ${StatusCodes.NOT_FOUND}`);
    }
    return res.status(StatusCodes.OK).send(snippet);
};

const snippetsPost = async (req, res, next) => {
    const newSnippet = { ...baseSnippet, ...req.body };
    const snippetId = await create(newSnippet, collections.snippets);
    if (snippetId === null) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Unable to save to the database`);
    }
    newSnippet.id = snippetId;
    delete newSnippet['_id'];
    res.setHeader('Location', snippetId);
    return res.status(StatusCodes.CREATED).send(newSnippet);
};

const snippetsPatch = async (req, res, next) => {
    const snippetId = req.query.id;
    const resultUpdate = await update(req.body, snippetId, collections.snippets);
    return res.status(StatusCodes.OK).send(resultUpdate);
}

const snippetsDelete = async (req, res, next) => {
    const snippetId = req.query.id;
    const resultDelete = await remove(snippetId, collections.snippets);
    return res.status(StatusCodes.OK).send(resultDelete);
};

module.exports = {
    snippetsGet,
    snippetsPost,
    snippetsPatch,
    snippetsDelete
}