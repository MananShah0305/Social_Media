import { LOGIN_USER } from './loginTypes.js'
import { LOGOUT_USER } from './loginTypes.js'
import { usernameLogin } from '../Login.js'

const initialState = {
    username: '',
    isLoggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            console.log(usernameLogin)
            return {
                ...state,
                username: usernameLogin,
                isLoggedIn: true,
            }

        case LOGOUT_USER:
            return {
                ...state,
                username: '',
                isLoggedIn: false,
            }

        default:
            return state
    }
}

export default reducer