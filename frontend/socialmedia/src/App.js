import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Login.js'
import Homepage from './Homepage.js'
import { Provider } from 'react-redux'
import store from './LoginRedux/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
    </Provider>
  );
}

export default App;
