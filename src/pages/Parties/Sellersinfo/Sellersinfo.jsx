import React, { useEffect, useState } from "react";
import "./Sellersinfo.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Sellersinfo = () => {

  const [sellersData, setSellersData] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: ""
  });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    const res = await fetch("http://https://e-business-backend-71ky.onrender.com//api/sellers");
    const data = await res.json();
    setSellersData(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSeller = async () => {
    if (editingId) {
      await fetch(`http://https://e-business-backend-71ky.onrender.com//api/sellers/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditingId(null);
    } else {
      await fetch("http://https://e-business-backend-71ky.onrender.com//api/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, due: 0 })
      });
    }

    fetchSellers();
    setForm({ name: "", company: "", phone: "" });
  };

  const deleteSeller = async (id) => {
    await fetch(`http://https://e-business-backend-71ky.onrender.com//api/sellers/${id}`, {
      method: "DELETE"
    });
    fetchSellers();
  };

  const editSeller = (seller) => {
    setForm(seller);
    setEditingId(seller._id);
  };

  const filtered = sellersData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalDue = sellersData.reduce((sum, s) => sum + (s.due || 0), 0);

  const chartData = {
    labels: sellersData.map(s => s.name),
    datasets: [{
      label: "Due Amount",
      data: sellersData.map(s => s.due || 0)
    }]
  };

  return (
    <div className="sellers-page">

      <h1>Sellers Dashboard</h1>

      {/* CARDS */}
      <div className="sellers-cards">
        <div className="card">
          <h4>Total Sellers</h4>
          <h2>{sellersData.length}</h2>
        </div>
        <div className="card">
          <h4>Total Due</h4>
          <h2>₹{totalDue}</h2>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="search-box"
        placeholder="Search seller..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CHART */}
      <div className="sellers-graph">
        <h3>Seller Due Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* FORM */}
      <div className="buyers-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button onClick={saveSeller}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <div className="sellers-table">
        <h3>All Sellers</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((seller) => (
                <tr key={seller._id}>
                  <td>{seller.name}</td>
                  <td>{seller.company}</td>
                  <td>{seller.phone}</td>
                  <td>
                    <button onClick={() => editSeller(seller)}>Edit</button>
                    <button onClick={() => deleteSeller(seller._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default Sellersinfo;