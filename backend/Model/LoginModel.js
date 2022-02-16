import mongoose from 'mongoose'

const loginSchema = {
    username: String,
    email: String,
    password: String,
    profilePic:String,
}

const login = mongoose.model('Login', loginSchema)



export default login