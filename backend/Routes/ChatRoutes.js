import express from 'express'
const router = express.Router()
import {addFriend, chatsUpdate,getIndividualChat} from '../Controllers/ChatController.js'

router.route('/:id').post(getIndividualChat)

router.route('/add-friend').post(addFriend)

router.route('/:id').patch(chatsUpdate)

export default router
