import { BrowserRouter, Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import Navbar from "./components/Navbar"
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/singup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
