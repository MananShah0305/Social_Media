import express from 'express'
const router = express.Router()
import {friendPost, chatPost,getChats} from '../Controllers/ChatController.js'

router.route('/').get(getChats)

router.route('/').post(friendPost)

router.route('/:id').patch(chatPost)

export default router
