import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const secret_key = 'meetup_pvt_ltd_tech_team'

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: String,
    profilePic: String,
    bio: String,
    token: String,
}, { collection: 'login-data' })

//For the below method , use function() to define and not arrow function definition, else it will not work
loginSchema.methods.generateAuthToken = async function() {
    try {
        const tokenJWT = jwt.sign({ _id: this._id }, secret_key, {
            expiresIn: '1d'
        })
        this.token = tokenJWT
        await this.save()
        return tokenJWT
    }
    catch (err) {
        console.log(err)
    }
}

const LoginModel = mongoose.model('Login', loginSchema)


export default LoginModel