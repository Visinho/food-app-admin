import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from 'react-router-dom'
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Add from "./pages/Add/Add";
import Home from "./pages/Home/Home";
 import { ToastContainer } from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const url = "http://localhost:4000"

  return ( 
    <div>
      <ToastContainer />
      <Navbar />
      <hr style={{ border: "1px solid lightgray", margin: "10px 0" }} />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
