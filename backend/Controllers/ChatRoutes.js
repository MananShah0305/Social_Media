import chatsModel from '../Model/ChatsModel.js'

export const getChats = (req, res) => {
    chatsModel.find()
        .then(result => {
            res.send({
                status: 'success',
                users: result
            })
        })
}

export const friendPost = async (req, res) => {
    const exists = await chatsModel.findOne({ name: req.body.username })
    const name = req.body.username
    const friendAdd = { name: req.body.friendName, chats: [] }

    if (exists) {
        console.log('true')
        chatsModel.updateOne({ name: name }, {
            $push: {
                friends: friendAdd
            }
        })
            .then(() => {
                console.log('Success')
            })
            .catch(err => console.log(err))

        return res.status(200).json({ message: 'Friend created', status: 'success' })
    }

    else {
        console.log('false')
        const chatDetails = new chatsModel({
            name, friends: friendAdd
        })
        chatDetails.save()
        return res.status(200).json({ message: 'Friend created', status: 'success' })
    }
}

export const chatPost = (req, res) => {

    const name = req.body.user
    const friendName = req.body.friendName
    const chats = req.body.chats

    chatsModel.findOneAndUpdate({ name: name, 'friends.name': friendName }, {
        $set: {
            'friends.$.chats': chats
        }
    })
        .then(() => {
            console.log('Success')
            console.log(chats)
        })
        .catch(err => console.log(err))

    return res.status(200).json({ message: 'Chat sent', status: 'success' })
}