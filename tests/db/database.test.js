const MongoClient = require('mongodb').MongoClient;

const crypto = require('crypto');

const url = 'mongodb://localhost:27017';
const mongoDbName = 'snippetsDB';
const snippetsCollectionName = 'snippets';

//const { getById, create } = require('../../db/database');
const database = require('../../db/database');

const validId = '123';
const mockSnippet = {
    'title': 'mockTitle',
    'description': 'mockDescription',
    'content': 'mockContent',
};

describe('unitTests', () => {
    let connection;
    let db;
    let snippetsCollection;

    beforeAll(async () => {
        connection = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(mongoDbName);
        global.db = await connection.db(mongoDbName);
        snippetsCollection = global.db.collection(snippetsCollectionName);
    });

    afterAll(async () => {
        //await db.collection('users').deleteMany({}); - for the standard test example
        await snippetsCollection.deleteMany({});
        await connection.close();
    });

    describe('getById', () => {
        it('should retrieve a snippet from the database given a valid snippet id', async () => {
            const validSnippet = { ...mockSnippet }
            mockSnippet.id = validId;
            await snippetsCollection.insertOne(mockSnippet);
            const savedSnippet = await database.getById(validId, snippetsCollectionName);
            delete mockSnippet['_id'];
            expect(savedSnippet).toEqual(mockSnippet);
        });

        it('should retrieve null when an invalid snippet id is provided but with a valid collection name', async () => {
            const invalidId = 'invalidId';
            const validSnippet = { ...mockSnippet }
            validSnippet.id = validId;
            await snippetsCollection.insertOne(validSnippet);
            const dbResult = await database.getById(invalidId, snippetsCollectionName);
            expect(dbResult).toEqual(null);
        });

        it('should retrieve null when an invalid collection provided', async () => {
            const invalidCollectionName = 'invalidCollectionName';
            const validSnippet = { ...mockSnippet }
            validSnippet.id = validId;
            await snippetsCollection.insertOne(validSnippet);
            const dbResult = await database.getById(validId, invalidCollectionName);
            expect(dbResult).toEqual(null);
        });
    });

    describe('create', () => {
        /** Mock Crypto */
        const crypto = require('crypto');
        jest.mock('crypto');

        it('should create a snippet entity with a valid body and a valid collection', async () => {
            crypto.randomUUID.mockReturnValue('111');
            const dbResultSnippetID = await database.create(mockSnippet, snippetsCollectionName);
            const dbResult = await snippetsCollection.findOne({id: dbResultSnippetID});
            expect(dbResult).toBeTruthy();
            console.log(dbResult);
        });
    });

    // /**
    //  * ! Standard Test Example
    //  */
    // xit('should insert a doc into collection', async () => {
    //     const users = db.collection('users');

    //     const mockUser = { _id: 'some-user-id', name: 'John' };
    //     await users.insertOne(mockUser);

    //     const insertedUser = await users.findOne({ _id: 'some-user-id' });
    //     expect(insertedUser).toEqual(mockUser);
    // });


});