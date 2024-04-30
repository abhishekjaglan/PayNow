import { ReactDOM } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from "./Pages/SignUp"
import { SignIn } from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"
import { SendMoney } from "./Pages/SendMoney"

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route path="/sendmoney" element={<SendMoney />}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App