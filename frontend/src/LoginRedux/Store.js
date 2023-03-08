import {createStore} from 'redux'
import reducer from './loginReducer'

const store=createStore(reducer)

export default store