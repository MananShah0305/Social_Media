import express from 'express'
import { getCredentials,getUsername, signUp,signIn,validateUser,emailVerify,passwordChange } from '../Controllers/UserDataController.js'
import validator from 'express-validator';
const { check } = validator;

import authenticate from '../Middlewares/authenticate.js'

const router = express.Router()

router.route('/login-credentials').get(getCredentials)

router.route('/username').get(getUsername)

router.route('/sign-up').post(
    [
        check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
        check('username').not().isEmpty().withMessage('Please enter a Username').isLength({ min: 6 }),
        check('password').not().isEmpty().withMessage('Please enter a Password').isLength({ min: 8 }),
    ], signUp)

router.route('/sign-in').post(signIn)

router.get('/validate-user',authenticate,validateUser)

router.route('/email-verify').post(emailVerify)

router.route('/password-reset').post(passwordChange)

export default router
