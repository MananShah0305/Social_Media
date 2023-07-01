import express from 'express'
import { getInfo } from '../Controllers/BasicInfoController.js'
const router = express.Router()

router.route('/').get(getInfo)

export default router
