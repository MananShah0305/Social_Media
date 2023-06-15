import express from 'express'
const router = express.Router()
import {addFriend, chatPost,getChats} from '../Controllers/ChatController.js'

router.route('/').post(getChats)

router.route('/add-friend').post(addFriend)

router.route('/:id').patch(chatPost)

export default router
