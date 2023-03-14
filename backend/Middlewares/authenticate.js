import jwt from 'jsonwebtoken'
import LoginModel from '../Model/LoginModel.js'

const secret_key = 'meetup_pvt_ltd_tech_team'

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const verifyToken=jwt.verify(token,secret_key)
        const user=await LoginModel.findOne({_id:verifyToken._id})

        if(!user){
            res.status(404).json({status:'error',message:'User not found'})
        }

        req.token=token
        req.user=user  // These reqs are written so that when we use req in validate user, eg. req. user, we would get the user details from here
        req.userId=user._id
        next() // After writing this next, then only the validateUser in LoginRoutes will execute, else if won't
    } catch (error) {
        console.log(error)
    }
}

export default authenticate