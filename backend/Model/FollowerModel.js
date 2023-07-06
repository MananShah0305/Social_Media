import mongoose from 'mongoose'

const followersSchema = new mongoose.Schema({
    username:String,
    followers: {
        count: Number,
        names: Array
    },
    following: {
        count: Number,
        names: Array
    },
}, { collection: 'followers-data' })

const followers = mongoose.model('Followers', followersSchema)

export default followers