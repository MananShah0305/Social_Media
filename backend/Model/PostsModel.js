import mongoose from 'mongoose'

const postSchema = {
    userProfile: {
        type:String,
        default:'https://cdn.pixabay.com/photo/2021/11/30/13/21/vintage-camera-6835351__340.jpg'
    },
    post: String,
    postInfo: {
        likes: {
            type:Number,
            default:0
        },
        comments: Array,
        saved: {
            type:Boolean,
            default:false
        },
        caption: String,
        creator: String,
        createdAt: {
            type:Date,
            default:new Date()
        }
    }
}

// const CONNECTION_URL = 'mongodb+srv://MananShah:MananShah@cluster0.almgc.mongodb.net/Users?retryWrites=true&w=majority'

// const db=mongoose.createConnection(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
// const posts=db.model('Posts',postSchema)

const posts = mongoose.model('Posts', postSchema)



export default posts