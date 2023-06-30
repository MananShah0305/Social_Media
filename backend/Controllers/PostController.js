import postModel from '../Model/PostModel.js'

export const getPosts = async (req, res) => {
    const result = await postModel.find()
    res.status(200).json({ status: 'success', posts: result })
}

export const uploadPost = (req, res) => {
    const postUploaded = req.body.postUploaded
    const creatorName = req.body.creatorName
    const creatorProfilePic = req.body.creatorProfilePic
    const caption = req.body.caption

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