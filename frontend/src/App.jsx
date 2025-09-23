import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider } from './features/authentication/contexts/AuthContext'
import Dashboard from './pages/Dashboard'
AuthProvider

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route 
            path='/'
            element={<Login/>}
          />
          <Route 
            path='/signup'
            element={<Signup/>}
          />
          
          {/* private routes */}
          <Route 
            path='/dashboard'
            element={<Dashboard/>}
          />
        </Routes>    
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
