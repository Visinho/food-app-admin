import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className="logo" src={assets.tasted_ok} alt="" />
      <img className="profile" src={assets.tasted_ok_pic} alt="" />
    </div>
  )
}

export default Navbar
