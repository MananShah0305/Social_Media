import express from 'express'
import chatsModel from '../Model/ChatsModel.js'
const router = express.Router()
import {friendPost, chatPost,getChats} from '../Controllers/ChatRoutes.js'

router.route('/').get(getChats)

router.route('/').post(friendPost)

router.route('/:id').patch(chatPost)

export default router
