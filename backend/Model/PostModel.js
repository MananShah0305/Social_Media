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
        commCreator: {
            type: String,
            default: "Manan"
        },
        commProfilePic: {
            type: String,
            default: "https://www.shutterstock.com/image-photo/view-mumbai-showing-bandra-worli-260nw-1493970836.jpg"
        },
        body: {
            type: String,
            default: "What a beautiful pic"
        },
        date: {
            type: Date,
            default: new Date()
        }
    }],
    saved: {
        type: Boolean,
        default: false
    },
}, { collection: 'post-data' })

const posts = mongoose.model('Posts', postSchema)

export default posts