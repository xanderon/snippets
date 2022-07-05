'use strict'

const basePath = '/api/v1/snippets';

const baseSnippet = {
    'title': '',
    'description': '',
    'content': ''
};

const collections = {
    'snippets': 'snippets'
}

const databases = {
    'snippetsDB': 'snippetsDB'
}

module.exports = {
    baseSnippet,
    collections,
    databases,
    basePath
}