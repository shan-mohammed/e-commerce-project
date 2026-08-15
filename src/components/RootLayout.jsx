import { useState } from 'react'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  const [search,setSearch]=useState("")
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar
        search={search}
        setSearch={setSearch}/>
        <main className='flex-1 grow'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <Outlet context ={{search,setSearch}}/>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout