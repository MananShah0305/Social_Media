import mongoose from 'mongoose'

const followersSchema = new mongoose.Schema({
    postUploaded: String,
    creatorName: String,
    creatorProfilePic: {
        type:String,
        default:'https://cdn.pixabay.com/photo/2021/11/30/13/21/vintage-camera-6835351__340.jpg'
    },
    createdAt: {
        type:Date,
        default:new Date()
    },
    likes: {
        type:Number,
        default:0
    },
    comments: Array,
    saved: {
        type:Boolean,
        default:false
    },
    caption: String
}, { collection: 'followers-data' })

const followers = mongoose.model('Followers', followersSchema)

export default posts