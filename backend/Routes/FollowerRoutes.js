import express from 'express'
const router = express.Router()
import { handleFriend,createFollowData ,getFollowersInfo } from '../Controllers/FollowerController.js'

router.route('/').post(getFollowersInfo)

router.route('/create-follow-data').post(createFollowData)

router.route('/add-friend').put(handleFriend)

export default router
