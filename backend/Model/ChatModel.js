import mongoose from 'mongoose'

const messageSchema = {
    messageType: String,
    message: String,
    messageTimestamp: Date
}

const friendSchema = {
    name: String,
    showChat: Boolean,
    chats:[messageSchema]
}

const chatSchema = new mongoose.Schema({
    name: String,
    friends: [friendSchema]
}, { collection: 'chat-data' })

const chats = mongoose.model('Chats', chatSchema)

export default chats