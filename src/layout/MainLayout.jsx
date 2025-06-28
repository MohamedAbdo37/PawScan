import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
        <header className="fixed top-0 w-full z-50">
            <Navbar />
        </header>
        <Outlet>

        </Outlet>
        <Footer />
    </>
  )
}

export default MainLayout
