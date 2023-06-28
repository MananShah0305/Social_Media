import bcrypt from "bcrypt"
import validator from "express-validator";
const { validationResult } = validator;
import UserDataModel from "../Model/UserDataModel.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const secret_key = "meetup_pvt_ltd_tech_team"

export const getCredentials = (req, res) => {
    UserDataModel.find()
        .then(result => {
            res.send({
                status: "success",
                credentials: result
            })
        })
}

export const getUsername = async (req, res) => {
    const userInfo = await UserDataModel.find({}, { username: 1, profilePic: 1 })
    res.status(200).json({ allUserInfo: userInfo })
}

export const signUp = async (req, res) => {
    const { email, username, password, profilePic, bio } = req.body
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(422).send("Not sent");
    }
    else {
        const existingEmail = await UserDataModel.findOne({ email })
        const existingUsername = await UserDataModel.findOne({ username })
        if (existingEmail) {
            return res.status(200).json({ message: "This email is already registered", status: "error" })
        }
        else if (existingUsername) {
            return res.status(200).json({ message: "A user with this username already exists", status: "error" })
        }
        else {
            const passwordEncrypted = await bcrypt.hash(password, 12)
            const loginDetails = await new UserDataModel({
                email, username, password: passwordEncrypted, profilePic, bio
            })

            loginDetails.save().then(() => {
                return res.status(200).json({ message: "You are registered successfully", status: "success" })
            })
        }
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body

    const existingUser = await UserDataModel.findOne({ username })
    if (!existingUser) {
        return res.status(200).json({ message: "This user does not have a registered account", status: "error" })
    }
    else {
        const passwordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordCorrect) {
            return res.status(200).json({ message: "Invalid credentials", status: "error" })
        }
        else {
            try {
                const token = await existingUser.generateAuthToken()
                res.cookie("user-cookie", token, {
                    // expires:new Date(Date.now()+9000000),
                    // maxAge:9000000,
                    httpOnly: true
                })

                return res.status(200).json({ status: "success", message: "success", result: existingUser })
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

export const validateUser = async (req, res) => {
    try {
        res.status(200).json({ status: "success", userDetails: req.user })
    } catch (error) {
        console.log(error)
    }
}

export const emailVerify = async (req, res) => {

    const { email } = req.body
    const existingUser = await UserDataModel.findOne({ email: email })

    if (!existingUser) {
        return res.status(200).json({ message1: "This email is not registered.", message2: "Enter a registered email", status: "error" })
    }

    else {
        try {

            const token = jwt.sign({ _id: existingUser._id }, secret_key, {
                expiresIn: "1d"
            });

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                // auth: {
                //     user: process.env.EMAIL,
                //     pass: process.env.PASSWORD
                // }
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Change password.",
                html: `<p>Click on the <a href="http://localhost:3000/password-reset/${existingUser._id}/${token}">given link </a>to change your password.</p>`
            }

            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Server is ready to take our messages");
                }
            });

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(info)
                    return res.status(200).json({ message1: "Email is successfully verified.", message2: "Check email to change password", status: "success" })
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const passwordChange = async (req, res) => {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(422).send("Not sent");
    }
    else {
        try {
            const { email, password } = req.body
            const existingUser = await UserDataModel.findOne({ email: email })

            const passwordEncrypted = await bcrypt.hash(password, 12)
            const loginDetails = await UserDataModel.findByIdAndUpdate({ _id: existingUser._id }, { password: passwordEncrypted })
            console.log(loginDetails)
            return res.status(200).json({ message: "Password is reset successfully", status: "success" })
        }
        catch (error) {
            console.log(error)
        }
    }
}
