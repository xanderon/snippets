'use strict'

const express = require('express');
const routes = require('./routes/snippets-route');
const database = require('./db/database');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
database.init();

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})