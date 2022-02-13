import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Login.js'
import Homepage from './Homepage.js'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Homepage/>}/>
    </Routes>
  );
}

export default App;
