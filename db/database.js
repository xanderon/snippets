'use strict'

const crypto = require('crypto');
const { databases } = require('../utils/constants');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/snippets';

/**
 * Creates the mongo connection when the app starts
 * The mongo connection will be available via global.db
 */
const init = async () => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.info('Connecting to the Mongo DB.');
        global.db = db.db(databases.snippetsDB);
    });
}

/**
 * @param {String} id
 * @param {String} collection
 * @returns {Object} Given a valid ID it should return the requested snippet
 */
const getById = async (id, collection) => {
    let snippet = null;
    try {
        snippet = await global.db.collection(collection).findOne({ id: id }, { projection: { '_id': 0 } });
        console.info(`DB query: Successfully retrieved snippet ${JSON.stringify(snippet)} from the database.`);
    } catch (error) {
        console.error(`Error while trying to get snippet with Id ${id}. Error: ${JSON.stringify(error)}.`);
    }
    return snippet;
}

/**
 * 
 * @param {Object} data 
 * @param {String} collection 
 * @returns {String} Returns the id of the newly created snippet
 */
const create = async (data, collection) => {
    data.id = crypto.randomUUID();
    try {
        await global.db.collection(collection).insertOne(data);
        console.info(`DB query: Successfully saved ${JSON.stringify(data)} into the database.`);
    } catch (error) {
        console.error(`Error while trying to save snippet ${data}. Error: ${JSON.stringify(error)}.`);
        return null;
    }
    return data.id;
}

/**
 * 
 * @param {Object} data 
 * @param {String} id 
 * @param {String} collection 
 * @returns 
 */
const update = async (data, id, collection) => {
    let whatIsUpdate;
    try {
        whatIsUpdate = await global.db.collection(collection).updateOne({ id: id }, { $set: data });
        console.info(`DB query: Successfully updated ${JSON.stringify(data)} into the database for the entity with id: ${id}.`);
        return whatIsUpdate;
    } catch (error) {
        console.error(`Error while trying to update snippet with id ${id} and data ${data}. Error: ${JSON.stringify(error)}.`);
    }
}

const remove = async (id, collection) => {
    let whatIsDelete;
    try {
        whatIsDelete = await global.db.collection(collection).deleteOne({ id: id });
        console.info(`DB query: Successfully deleted ${id} from the database.`);
        return whatIsDelete;
    } catch (error) {
        console.error(`Error while trying to delete snippet with id ${id}. Error: ${JSON.stringify(error)}.`);
    }
};

module.exports = {
    init,
    getById,
    create,
    update,
    remove
}