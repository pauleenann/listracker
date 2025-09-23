import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './features/authentication/contexts/AuthContext'
import PrivateRoutes from './routes/PrivateRoutes'
import PublicRoutes from './routes/PublicRoutes'
import AuthRoutes from './routes/AuthRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRoutes/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
