import postModel from '../Model/PostsModel.js'

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
    const post = req.body.post
    const postInfo = {
        caption: req.body.caption,
        creator: req.body.creator
    }
    const postDetails = new postModel({
        post, postInfo
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