import express from 'express'
const router = express.Router()
import {addFriend, chatPost,getChats} from '../Controllers/ChatController.js'

router.route('/').get(getChats)

router.route('/').post(addFriend)

router.route('/:id').patch(chatPost)

export default router
