import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.tasted_ok} alt="Logo" />
      </Link>
      <img className="profile" src={assets.tasted_ok_pic} alt="" />
    </div>
  );
};

export default Navbar;
