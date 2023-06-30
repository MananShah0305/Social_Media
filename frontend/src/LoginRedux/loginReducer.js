import { LOGIN_USER } from './loginTypes.js'
import { LOGOUT_USER } from './loginTypes.js'
import { EMAIL_VERIFY } from './loginTypes.js'
import { usernameLogin } from '../Components/Authentication.jsx'
import { emailVerify } from '../Components/EmailVerify.jsx'

const initialState = {
    username: '',
    isLoggedIn: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER:
            sessionStorage.setItem('username', usernameLogin);
            sessionStorage.setItem('isLoggedIn', true);
            return {
                ...state,
                username: sessionStorage.getItem('username'),
                isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            }

        case LOGOUT_USER:
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('isLoggedIn');
            return {
                ...state,
                username: '',
                isLoggedIn: false,
            }

        case EMAIL_VERIFY:
            sessionStorage.setItem('email', emailVerify);
            return {
                ...state,
                email: emailVerify
            }

        default:
            return state
    }
}

export default reducer