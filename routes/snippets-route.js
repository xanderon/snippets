'use strict'

const express = require('express');
const { basePath } = require('../utils/constants');
const { snippetsGet, snippetsPost, snippetsPatch, snippetsDelete } = require('../controllers/snippets-controller');
const { snippetsPostValidator, snippetsPatchValidator, snippetsDeleteValidator } = require('../middleware/snippetsValidator');
const router = express.Router();

router.get(basePath, snippetsGet);
router.post(basePath, snippetsPostValidator, snippetsPost);
router.patch(basePath, snippetsPatchValidator, snippetsPatch);
router.delete(basePath, snippetsDeleteValidator, snippetsDelete);

module.exports = router;