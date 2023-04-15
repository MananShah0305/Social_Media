import chatsModel from '../Model/ChatModel.js'

export const getChats = async (req, res) => {
    const result = await chatsModel.find()
    try {
        return res.status('200').json({ status: 'success', users: result })
    }
    catch (error) {
        console.log(error)
    }
}

export const addFriend = async (req, res) => {
    const existingUser = await chatsModel.findOne({ name: req.body.username })
    const friendAdd = { name: req.body.friendName, chats: [] }

    if (existingUser) {
        chatsModel.updateOne({ name: existingUser.name }, {
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

export const chatPost = async (req, res) => {

    const name = req.body.user
    const friendName = req.body.friendName
    const chats = req.body.chats

    chatsModel.findOneAndUpdate({ name: name, 'friends.name': friendName }, {
        $cond: {
            if: {
                $eq: ["$showChat", false]
            }, 
            then: true
        },
        $set: {
            'friends.$.chats': chats
        }
    })
        .then(() => {
            return res.status(200).json({ message: 'Chat sent', status: 'success' })
        })
        .catch(err => console.log(err))

}