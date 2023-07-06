import followerModel from '../Model/FollowerModel.js'

export const getFollowersInfo = async (req, res) => {
    const result = await followerModel.findOne({ username: req.body.name })
    try {
        return res.status('200').json({ status: 'success', friendData: result })
    }
    catch (error) {
        console.log(error)
    }
}

export const createFollowData = async (req, res) => {
    const username = req.body.username
    const followers = {
        count: 0,
        names: []
    }
    const following = {
        count: 0,
        names: []
    }

    const followersDetails = await new followerModel({
        username, followers, following
    })

    followersDetails.save()

    return res.status('200').json({ status: 'success' })

}

export const handleFriend = async (req, res) => {
    const friendData = { friendName: req.body.friendName, friendProfilePic: req.body.friendProfilePic }
    const userData = { username: req.body.username, userProfilePic: req.body.userProfilePic }

    const existingFriend = followerModel.findOne({ name: friendData.username, 'followers.$.names.name': friendData.friendName })

    if (req.body.follow == true) {
        if (!existingFriend) {
            followerModel.updateOne({ username: friendData.username }, {
                $inc: {
                    'followers.$.count': 1
                },
                $push: {
                    followers: {
                        'names': userData
                    }
                }
            })
                .then(() => {
                    console.log('Success')
                })
                .catch(err => console.log(err))

            followerModel.updateOne({ username: userData.friendName }, {
                $inc: {
                    'following.$.count': 1
                },
                $push: {
                    following: {
                        'names': friendData
                    }
                }
            })
                .then(() => {
                    console.log('Success')
                })
                .catch(err => console.log(err))
        }
    }

    else if (req.body.follow == false) {
        if (existingFriend) {
            followerModel.updateOne({ username: friend.username }, {
                $inc: {
                    'followers.$.count': -1
                },
                $pull: {
                    followers: {
                        'names.followerName': userData.username
                    }
                }
            })
                .then(() => {
                    console.log('Success')
                })
                .catch(err => console.log(err))

            followerModel.updateOne({ username: userData.username }, {
                $inc: {
                    'following.$.count': -1
                },
                $pull: {
                    following: {
                        'names.followerName': friendData.username
                    }
                }
            })
                .then(() => {
                    console.log('Success')
                })
                .catch(err => console.log(err))
        }
    }

    return res.status(200).json({ status: 'success' })
}

// export const chatsUpdate = async (req, res) => {

//     const name = req.body.user
//     const friendName = req.body.friendName
//     const newChat = req.body.newChat

//     chatsModel.findOneAndUpdate({ username: name, friendName: friendName }, {
//         $cond: {
//             if: {
//                 $eq: ["$showChat", false]
//             },
//             then: true
//         },
//         $push: {
//             'chats': newChat
//         }
//     })
//         .then(() => {
//             return res.status(200).json({ message: 'Chat sent', status: 'success' })
//         })
//         .catch(err => console.log(err))
// }

