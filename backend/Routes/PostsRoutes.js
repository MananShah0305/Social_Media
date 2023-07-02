import express from 'express'
import { getPosts,getIndividualUserPosts,uploadPost,editPost} from '../Controllers/PostController.js'

const router = express.Router()

router.route('/').get(getPosts)

router.route('/userpost/:id').post(getIndividualUserPosts)

router.route('/').post(uploadPost)

router.route('/:id').patch(editPost)

export default router