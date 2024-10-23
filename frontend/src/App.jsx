import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return(

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>

  )
}

export default App
