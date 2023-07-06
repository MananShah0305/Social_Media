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
    profilePic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    bio: String,
    token: String,
}, { collection: 'user-data' })

//For the below method , use function() to define and not arrow function definition, else it will not work
userDataSchema.methods.generateAuthToken = async function () {
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