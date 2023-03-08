import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login.jsx'
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
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={sessionStorage.getItem('username')?<Homepage />:<Login />} />
        <Route path='/post' element={sessionStorage.getItem('username')?<Post />:<Login />} />
        <Route path='/chatSection' element={sessionStorage.getItem('username')?<ChatSection/>:<Login />} />
      </Routes>
    </Provider>
  );
}


export default App
