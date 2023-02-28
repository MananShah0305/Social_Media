import express from 'express'
import { getCredentials,getUsername, signUp,signIn } from '../Controllers/LoginController.js'
import validator from 'express-validator';
const { check } = validator;

const router = express.Router()

router.route('/loginCredentials').get(getCredentials)

router.route('/username').get(getUsername)

router.route('/signUp').post(
    [
        check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
        check('username').not().isEmpty().withMessage('Please enter a Username').isLength({ min: 6 }),
        check('password').not().isEmpty().withMessage('Please enter a Password').isLength({ min: 8 }),
    ], signUp)

router.route('/signIn').post(signIn)

export default router
