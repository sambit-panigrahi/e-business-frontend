import React, { useState } from "react";
import "./Productform.css";

function Productform() {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://e-business-backend-71ky.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        })
      });

      if (res.ok) {
        alert("Product Added Successfully");
        setFormData({ name: "", category: "", price: "", stock: "" });
      }

    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Product</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required />

        <button type="submit">Add Product</button>

      </form>
    </div>
  );
}

export default Productform;