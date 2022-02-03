import mongoose from 'mongoose'

const messageSchema = {
    messageType: String,
    message: String,
    messageTimestamp: Date
}

const friendSchema = {
    name: String,
    chats:[messageSchema]
}

const chatSchema = {
    name: String,
    friends: [friendSchema]
}

const chats = mongoose.model('Chats', chatSchema)

export default chats