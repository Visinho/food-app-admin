import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { FaShoppingCart, FaUtensils, FaList, FaMoneyBillWave } from "react-icons/fa";

const Home = () => {
  const url = "http://localhost:4000"; 

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalFoods: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${url}/api/order/getstats`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Admin Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card blue">
          <FaShoppingCart className="stat-icon" />
          <div>
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p> 
          </div>
        </div>

        <div className="stat-card green">
          <FaUtensils className="stat-icon" />
          <div>
            <h3>Total Foods</h3>
            <p>{stats.totalFoods}</p> 
          </div>
        </div>

        <div className="stat-card yellow">
          <FaList className="stat-icon" />
          <div>
            <h3>Categories</h3>
            <p>{stats.totalCategories}</p> 
          </div>
        </div>

        <div className="stat-card purple">
          <FaMoneyBillWave className="stat-icon" />
          <div>
            <h3>Revenue</h3>
            <p>₦{stats.totalRevenue}</p> 
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h2>Quick Actions</h2>
        <div className="links">
          <a href="/add" className="link-btn">➕ Add New Food</a>
          <a href="/list" className="link-btn">📃 View Food List</a>
          <a href="/orders" className="link-btn">📦 Manage Orders</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
