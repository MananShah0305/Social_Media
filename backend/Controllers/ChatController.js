import chatsModel from '../Model/ChatModel.js'

export const getIndividualChat = async (req, res) => {
    const result = await chatsModel.findOne({ username: req.body.name, friendName: req.body.friendName })
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
    const newChat = req.body.newChat

    chatsModel.findOneAndUpdate({ username: name, friendName: friendName }, {
        $cond: {
            if: {
                $eq: ["$showChat", false]
            },
            then: true
        },
        $push: {
            'chats': newChat
        }
    })
        .then(() => {
            return res.status(200).json({ message: 'Chat sent', status: 'success' })
        })
        .catch(err => console.log(err))
}
