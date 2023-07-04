import mongoose from 'mongoose'

const messageSchema = {
    messageType: String,
    message: String,
    messageTimestamp: Date
}

const chatSchema = new mongoose.Schema({
    username: String,
    friendname: String,
    showChat: Boolean,
    chats: [messageSchema]
}, { collection: 'chat-data' })

const chats = mongoose.model('Chats', chatSchema)

export default chats