import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <div className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p className="add-items">Add Items</p>
        </div>
        <div className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p className="add-items">List Items</p>
        </div>
        <div className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p className="add-items">Orders</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
