import { LOGIN_USER } from './loginTypes.js'
import { LOGOUT_USER } from './loginTypes.js'
import { usernameLogin,isGoogleLogin } from '../Components/Authentication.jsx'

const initialState = {
    username: '',
    isLoggedIn: false,
    // isGoogleLogin:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER:
            sessionStorage.setItem('username', usernameLogin);
            sessionStorage.setItem('isLoggedIn', true);
            // sessionStorage.setItem('isGoogleLogin', isGoogleLogin);
            // console.log(sessionStorage.getItem('username'))
            return {
                ...state,
                username: sessionStorage.getItem('username'),
                isLoggedIn: sessionStorage.getItem('isLoggedIn'),
                // isGoogleLogin: sessionStorage.getItem('isGoogleLogin')
            }

        case LOGOUT_USER:
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('isLoggedIn');
            // sessionStorage.removeItem('isGoogleLogin');
            return {
                ...state,
                username: '',
                isLoggedIn: false,
                // isGoogleLogin: false,
            }

        default:
            return state
    }
}

export default reducer