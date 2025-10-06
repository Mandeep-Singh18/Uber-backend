import { Route, Routes } from "react-router-dom"
import UserLogin from "./pages/UserLogin"
import UserRegister from "./pages/UserRegister"
import Home from "./pages/Home"
import DriverLogin from "./pages/DriverLogin"
import DriverRegister from "./pages/DriverRegister"
import Layout from "./features/global/components/layout"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/user-login" element={<UserLogin/>} />
          <Route path="/user-register" element={<UserRegister/>} />
          <Route path="/driver-login" element={<DriverLogin/>} />
          <Route path="/driver-login" element={<DriverLogin/>} />
          <Route path="/driver-register" element={<DriverRegister/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App