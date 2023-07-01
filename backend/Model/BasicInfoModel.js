import mongoose from 'mongoose'

const BasicInfoSchema = new mongoose.Schema({
    username: String,
    profilePic: String,
}, { collection: 'basic-info' })

const BasicInfoModel = mongoose.model('BasicInfo', BasicInfoSchema)

export default BasicInfoModel