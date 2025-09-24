import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'

const Dashboard = () => {
  return (
    <MainLayout>
      <Navbar menu={"Dashboard"}/>
    </MainLayout>
  )
}

export default Dashboard
