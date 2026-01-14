const express = require('express');
const { body } = require('express-validator');
const { register, login, googleLogin, verifyEmail, resendCode } = require('../controller/auth.controller');

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

router.post('/login/google', googleLogin);

// ✅ Thêm hai route mới:
router.post(
  '/verify-email',
  [
    body('email').isEmail().withMessage('valid email required'),
    body('code').notEmpty().withMessage('verification code required'),
  ],
  verifyEmail
);

router.post(
  '/resend-code',
  [
    body('email').isEmail().withMessage('valid email required'),
  ],
  resendCode
);

module.exports = router;
