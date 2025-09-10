const express = require('express');
const auth = require('../middlewares/middlewares.auth');
const userData = require('../controller/profile.controller');

const router = express.Router();
router.get('/:userId', auth(), userData.profileUser);
router.get('/post-info/:userId', auth(), userData.getInfoUserPost);
module.exports = router;
