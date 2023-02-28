import express from 'express'
import { getPosts,uploadPost,editPost} from '../Controllers/PostController.js'

const router = express.Router()

router.route('/').get(getPosts)

router.route('/').post(uploadPost)

router.route('/:id').patch(editPost)

export default router