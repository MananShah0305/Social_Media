import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Login.js'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>
  );
}

export default App;
