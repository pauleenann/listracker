import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './features/authentication/contexts/AuthContext'
import AuthRoutes from './routes/AuthRoutes'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRoutes/>

        {/* toast */}
        <Toaster/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
