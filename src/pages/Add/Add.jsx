import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [ image, setImage ] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ data, setData ] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  })

  const [categoryImage, setCategoryImage] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: ""
  });

   const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`);
      if (response.data.success) {
        setCategories(response.data.data);
        if (response.data.data.length > 0) {
          setData(prev => ({ ...prev, category: response.data.data[0].name })); // default first category
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onCategoryChange = (e) => {
    const {name, value} = e.target;
    setCategoryData(prev => ({...prev, [name]: value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if(response.data.success) {
        setData({
            name: "",
            description: "",
            price: "",
            category: ""
        })
        setImage(false)
        toast.success(response.data.message)
    }else {
      toast.error(response.data.message)
    }
  }

   const submitCategory = async (e) => {
    e.preventDefault();
    if (!categoryData.name || !categoryImage) return toast.error("Category name and image required!");
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", categoryImage);
    const response = await axios.post(`${url}/api/category/add`, formData);
    if(response.data.success) {
        setCategoryData({ name: "" });
        setCategoryImage(false);
        toast.success(response.data.message);
        fetchCategories(); // Refresh category list for food dropdown
    } else toast.error(response.data.message);
  }

  return (
    <div className='add'>

      <form className='flex-col' onSubmit={submitCategory}>
        <h2>Add New Category</h2>
        <div className="add-img-upload flex-col">
          <p>Upload Category Image</p>
          <label htmlFor='categoryImage' className='upload'>
            <img src={categoryImage ? URL.createObjectURL(categoryImage):assets.upload_area} alt='' />
          </label>
          <input onChange={(e)=>setCategoryImage(e.target.files[0])} type='file' id='categoryImage' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Category Name</p>
          <input onChange={onCategoryChange} value={categoryData.name} type='text' name='name' placeholder='Type here...' required />
        </div>
        <button type='submit' className='add-btn'>ADD CATEGORY</button>
      </form>

      <form className='flex-col' onSubmit={onSubmitHandler}>
        <h2 className='space'>Add New Food</h2>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image' className='upload'>
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt='' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here...' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' />
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category} required>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
            ))}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD FOOD</button>
      </form>
    </div>
  )
}

export default Add
