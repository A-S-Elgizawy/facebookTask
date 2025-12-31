import { useState } from 'react'
import { BrowserRouter, Routes, Route ,HashRouter} from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/createAccount'
import Login from './pages/Login'

function App() {
  return (
      <HashRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Account />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export default App
