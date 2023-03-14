import { Routes, Route } from 'react-router-dom'
import Authentication from './Components/Authentication.jsx'
import Homepage from './Components/Homepage.jsx'
import Post from './Components/Post.jsx'
import ChatSection from './Components/ChatSection.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import { Provider } from 'react-redux'
import store from './LoginRedux/Store.js'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        {/* <Route path='/' element={sessionStorage.getItem('username')?<Homepage />:<Authentication />} /> */}
      </Routes>
    </Provider>
  );
}


export default App
