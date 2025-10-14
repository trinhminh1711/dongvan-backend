const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/middlewares.auth');
const { register, login } = require('../controller/auth.controller');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('username is required'),
    body('email').isEmail().withMessage('valid email required'),
    body('password').isLength({ min: 6 }).withMessage('password min length 6')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('valid email required'),
    body('password').notEmpty().withMessage('password required')
  ],
  login
);
module.exports = router;
