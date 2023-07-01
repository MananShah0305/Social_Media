import BasicInfoModel from "../Model/BasicInfoModel.js"

export const getInfo = async (req, res) => {
    const userInfo = await BasicInfoModel.find()
    res.status(200).json({ allUserBasicInfo: userInfo })
}

