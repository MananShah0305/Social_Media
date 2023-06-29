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
    const postUploaded = req.body.post
    const creatorName = req.body.username
    const creatorProfilePic = req.body.profilePic
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