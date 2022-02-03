import mongoose from 'mongoose'

const loginSchema = {
    username: String,
    email: String,
    password: String
}

const login = mongoose.model('Login', loginSchema)



export default login