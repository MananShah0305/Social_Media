import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Login.js'
import Homepage from './Homepage.js'
import Post from './Post'
import ChatSection from './ChatSection'
import { Provider } from 'react-redux'
import store from './LoginRedux/Store.js'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={sessionStorage.getItem('username')?<Homepage />:<Login />} />
        <Route path='/post' element={sessionStorage.getItem('username')?<Post />:<Login />} />
        <Route path='/chatSection' element={sessionStorage.getItem('username')?<ChatSection/>:<Login />} />
      </Routes>
    </Provider>
  );
}


export default App
