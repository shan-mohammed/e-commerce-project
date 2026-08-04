import React from 'react'
import { NavLink } from 'react-router-dom'



const Navbar = () => {
    const navLinkStyle=({isActive })=>
    isActive 
       ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1"
       :"text-gray-300 hover:text-teal-400 transition duration-300";
  return (
   <nav className=''>
    <div className='flex justify-between mr-4'>
      <div>

      {/* Logo */}
      <h1 className='text-teal-300 font-bold'>WE
        <span className='text-gray-400'>SHOP</span>
      </h1>
      </div>
     <input type="search" name="" id=""  placeholder='Searhe Here...' className='border border-blue-400 rounded'/>
     <NavLink to="/login" className={navLinkStyle}>
           Login
          </NavLink>
   <NavLink to="/Cart" >
           Cart
          </NavLink>   
           </div>
   

      {/* Navigation links */}
      <div>
        <div className='flex justify-between mt-5 mr-4'>

   <NavLink>All</NavLink>
    <NavLink>Furniture</NavLink>
     <NavLink>Clothings</NavLink>
      <NavLink>Fashion</NavLink>
        </div>
      </div>

   
   </nav>
  )
}

export default Navbar