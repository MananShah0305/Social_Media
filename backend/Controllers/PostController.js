import postModel from '../Model/PostModel.js'

export const getPosts = async (req, res) => {
    await postModel.find()
        .then(result => {
            res.send({
                status: 'success',
                posts: result
            })
        })
}

export const uploadPost = (req, res) => {
    const postUploaded = req.body.postUploaded
    const creatorName = req.body.creatorName
    const creatorProfilePic = req.body.creatorProfilePic
    const caption = req.body.caption
    const createdAt = req.body.createdAt
    const likes = req.body.likes
    const comments = req.body.comments
    const saved = req.body.saved

    // console.log(postUploaded)
    // console.log(creatorName)
    // console.log(creatorProfilePic)
    // console.log(caption)
    // console.log(createdAt)
    // console.log(likes)
    // console.log(comments)
    // console.log(saved)
    const postDetails = new postModel({
        postUploaded, creatorName, creatorProfilePic, caption
    })

    postDetails.save()

    return res.status(200).json({ message: 'Post created successfully', status: 'success' })
}

export const editPost = (req, res) => {
    console.log('Patch method called')
    postModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            postInfo: req.body.postInfo
        }
    })
        .then(() => {
            console.log('Success')
        })
        .catch(err => console.log(err))

}