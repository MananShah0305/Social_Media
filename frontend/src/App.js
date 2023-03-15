import { Routes, Route, Navigate } from 'react-router-dom'
import Authentication from './Components/Authentication.jsx'
import Homepage from './Components/Homepage.jsx'
import Post from './Components/Post.jsx'
import ChatSection from './Components/ChatSection.jsx'
import EmailVerify from './Components/EmailVerify.jsx'
import PasswordReset from './Components/PasswordReset.jsx'
import { Provider } from 'react-redux'
import store from './LoginRedux/Store.js'

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/' element={localStorage.getItem('userAuthorizeToken')?<Homepage />:<Authentication />} />
      </Routes>
    </Provider>
  );
}


export default App
