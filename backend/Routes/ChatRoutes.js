import express from 'express'
const router = express.Router()
import {chatsUpdate,getIndividualChat} from '../Controllers/ChatController.js'

router.route('/:id').post(getIndividualChat)

router.route('/:id').patch(chatsUpdate)

export default router
