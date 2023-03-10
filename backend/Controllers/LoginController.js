import bcrypt from 'bcrypt'
import validator from 'express-validator';
const { validationResult } = validator;
import LoginModel from '../Model/LoginModel.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { secret_key } from '../index.js'

export const getCredentials = (req, res) => {
    LoginModel.find()
        .then(result => {
            res.send({
                status: 'success',
                credentials: result
            })
        })
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


export const getUsername = async (req, res) => {
    const userInfo = await LoginModel.find({}, { username: 1, profilePic: 1 })
    res.status(200).json({ allUserInfo: userInfo })
}

export const signUp = async (req, res) => {
    const { email, username, password, profilePic, bio } = req.body
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(422).send('Not sent');
    }
    else {
        const existingEmail = await LoginModel.findOne({ email })
        const existingUsername = await LoginModel.findOne({ username })
        if (existingEmail) {
            return res.status(200).json({ message: 'This email is already registered', status: 'error' })
        }
        else if (existingUsername) {
            return res.status(200).json({ message: 'A user with this username already exists', status: 'error' })
        }
        else {
            const passwordEncrypted = await bcrypt.hash(password, 12)
            const loginDetails = await new LoginModel({
                email, username, password: passwordEncrypted, profilePic, bio
            })

            loginDetails.save().then(() => {
                return res.status(200).json({ message: 'You are registered successfully', status: 'success' })
            })
        }
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body

    const existingUser = await LoginModel.findOne({ username })
    if (!existingUser) {
        return res.status(200).json({ message: 'This user does not have a registered account', status: 'error' })
    }
    else {
        const passwordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordCorrect) {
            return res.status(200).json({ message: 'Invalid credentials', status: 'error' })
        }
        else {
            try {
                const token = await existingUser.generateAuthToken()
                // console.log(token)
                res.cookie('user-cookie',token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                })

                return res.status(200).json({ status: 'success',token:token })
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

export const emailVerify = async (req, res) => {

    const { email } = req.body
    const existingUser = await LoginModel.findOne({ email: email })

    if (!existingUser) {
        return res.status(200).json({ message1: 'This email is not registered.', message2: 'Enter a registered email', status: 'error' })
    }

    else {
        try {
            const token = jwt.sign({ _id: existingUser._id }, secret_key, {
                expiresIn: "1d"
            });
            // console.log(existingUser)
            return res.status(200).json({ message1: 'Email is successfully verified.', message2: 'Check email to change password', status: 'success' })
        }
        catch (error) {
            console.log(error)
        }
    }
}

