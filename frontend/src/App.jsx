import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Login/>}
        />
        <Route 
          path='/signup'
          element={<Signup/>}
        />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
