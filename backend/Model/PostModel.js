import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    postUploaded: String,
    creatorName: String,
    creatorProfilePic: String,
    caption: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        body: String,
        date: Date
    }],
    saved: {
        type: Boolean,
        default: false
    },
}, { collection: 'post-data' })

const posts = mongoose.model('Posts', postSchema)

export default posts