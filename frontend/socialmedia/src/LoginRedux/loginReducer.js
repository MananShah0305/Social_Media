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
            sessionStorage.setItem('username', usernameLogin);
            sessionStorage.setItem('isLoggedIn', true);
            console.log(sessionStorage.getItem('isLoggedIn'))
            return {
                ...state,
                username: sessionStorage.getItem('username'),
                isLoggedIn: sessionStorage.getItem('isLoggedIn')
            }

        case LOGOUT_USER:
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('isLoggedIn');
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