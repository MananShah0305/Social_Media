import {LOGIN_USER} from './loginTypes.js'
import {LOGOUT_USER} from './loginTypes.js'
import {EMAIL_VERIFY} from './loginTypes.js'

export const loginUser=()=>{
    return {
        type:LOGIN_USER
    }
}

export const logoutUser=()=>{
    return {
        type:LOGOUT_USER
    }
}

export const emailVerification=()=>{
    return {
        type:EMAIL_VERIFY
    }
}