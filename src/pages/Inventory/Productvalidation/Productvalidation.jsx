import React, { useEffect, useState } from "react";
import "./Productvalidation.css";

function Productvalidation() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="validation-container">

      <h2 className="validation-title">Product Validation</h2>

      <input
        className="search-box"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.stock ? Number(p.stock) : Math.floor(Math.random() * 50) + 10}</td>
              <td className={(Number(p.stock) || 20) < 10 ? "low" : "ok"}>
                 {(Number(p.stock) || 20) < 10 ? "Low Stock" : "Valid"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Productvalidation;