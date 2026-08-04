import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className='flex-1 grow'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <Outlet/>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout