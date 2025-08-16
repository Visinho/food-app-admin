import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr style={{ border: "1px solid lightgray", margin: "10px 0" }} />
      <div className="app-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
