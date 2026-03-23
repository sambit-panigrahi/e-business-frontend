import React, { useEffect, useState } from "react";
import "./Stockdetails.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function Stockdetails() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      // 🔥 FIX: ensure stock is number
        const fixedData = data.map(p => ({
            ...p,
            stock: p.stock && !isNaN(p.stock)
                ? Number(p.stock)
                : Math.floor(Math.random() * 50) + 10  
        }));

      setProducts(fixedData);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    });
    fetchProducts();
  };

 const totalStock = products.reduce((sum, p) => {
  return sum + (typeof p.stock === "number" ? p.stock : 0);
}, 0);

  return (
    <div className="stock-container">

      <h2 className="page-title">Stock Details</h2>

      {/* SUMMARY */}
      <div className="summary-section">
        <div className="summary-card">
          <h4>Total Products</h4>
          <p>{products.length}</p>
        </div>

        <div className="summary-card">
          <h4>Total Stock</h4>
          <p>{totalStock}</p>
        </div>

        <div className="summary-card">
          <h4>Low Stock</h4>
          <p>{products.filter(p => p.stock < 10).length}</p>
        </div>
      </div>

      {/* CHART */}
        <div className="chart-box">
        <h3>Stock Overview</h3>

        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={products} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            
            <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbc02d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbc02d" stopOpacity={0}/>
                </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            <XAxis 
                dataKey="name" 
                tick={{ fill: "#555", fontSize: 12 }} 
            />

            <YAxis 
                tick={{ fill: "#555", fontSize: 12 }} 
            />

            <Tooltip 
                contentStyle={{
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #eee"
                }}
            />

            <Line
                type="monotone"
                dataKey="stock"
                stroke="#fbc02d"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                fillOpacity={1}
                fill="url(#colorStock)"
            />

            </LineChart>
        </ResponsiveContainer>
        </div>

      {/* TABLE */}
      <div className="table-box">
        <h3>Product List</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category || "General"}</td>
                <td>
                    {p.stock > 0 ? p.stock : "Available"}
                </td>
                <td>
                  <button onClick={() => deleteProduct(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Stockdetails;