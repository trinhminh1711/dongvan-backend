const express = require('express');
const auth = require('../middlewares/middlewares.auth');
const { profile } = require('../controller/me.controller');

const router = express.Router();
router.get('/me', auth(), profile);
module.exports = router;
