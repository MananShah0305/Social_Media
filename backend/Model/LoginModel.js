import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePic:String,
    bio:String,
},{collection:'login-data'})

const LoginModel = mongoose.model('Login', loginSchema)



export default LoginModel