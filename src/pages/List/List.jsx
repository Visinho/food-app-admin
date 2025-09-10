import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/food/delete/${foodId}`);
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error deleting food item!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const isUnavailable = (from, to) => {
  const now = new Date().toTimeString().slice(0,5);
  return now < from || now > to;
};

  return (
    <div className="list add flex-col">
      <h3>All Foods List</h3>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Available From</b>
          <b>Available To</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={`list-table-format ${
                isUnavailable(item.availableFrom, item.availableTo)
                  ? "unavailable"
                  : ""
              }`}
            >
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₦{item.price}</p>
              <p>{item.availableFrom}</p>
              <p>{item.availableTo}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
