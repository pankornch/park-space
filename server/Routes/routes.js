const express = require('express');
const router = express.Router();

const auth = require('./Auth/auth');
const api = require('./api');



router.use('/auth', auth)
    .use('/api', api);


module.exports = router;

