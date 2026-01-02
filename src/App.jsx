import { useState } from 'react'
import { BrowserRouter, Routes, Route ,HashRouter , Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/createAccount'
import Login from './pages/Login'

function App() {
  return (
      <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/account" />} />
        <Route path="/account" element={<Account />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export default App
