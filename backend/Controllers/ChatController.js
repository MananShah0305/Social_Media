import chatsModel from '../Model/ChatModel.js'

export const getIndividualChat = async (req, res) => {
    const result = await chatsModel.findOne({ name: req.body.username,friendName:req.body.friendName })
    try {
        return res.status('200').json({ status: 'success', chatInfo: result })
    }
    catch (error) {
        console.log(error)
    }
}

export const chatsUpdate = async (req, res) => {

    const name = req.body.user
    const friendName = req.body.friendName
    const newChat = req.body.chat

    chatsModel.findOneAndUpdate({ name: name, 'friends.name': friendName }, {
        $cond: {
            if: {
                $eq: ["$showChat", false]
            },
            then: true
        },
        $push: {
            'friends.$.chats': newChat
        }
    })
        .then(() => {
            return res.status(200).json({ message: 'Chat sent', status: 'success' })
        })
        .catch(err => console.log(err))
}

export const addFriend = async (req, res) => {
    const existingUser = await chatsModel.findOne({ name: req.body.username })
    const friendAdd = { name: req.body.friendName, chats: [] }

    chatsModel.updateOne({ name: existingUser.username }, {
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