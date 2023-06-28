import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const secret_key = 'meetup_pvt_ltd_tech_team'

const userDataSchema = new mongoose.Schema({
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
    followers: {
        type:Number,
        default:0
    },
    following: {
        type:Number,
        default:0
    },
    totalPosts: {
        type:Number,
        default:0
    },
    token: String,
}, { collection: 'userData-data' })

//For the below method , use function() to define and not arrow function definition, else it will not work
userDataSchema.methods.generateAuthToken = async function() {
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

const userDataModel = mongoose.model('UserData', userDataSchema)


export default userDataModel