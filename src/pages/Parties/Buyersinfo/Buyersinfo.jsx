import React, { useEffect, useState } from "react";
import "./Buyersinfo.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Buyersinfo = () => {

  const [buyersData, setBuyersData] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    const res = await fetch("https://e-business-backend-71ky.onrender.com/api/customers");
    const data = await res.json();
    setBuyersData(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const saveCustomer = async () => {
    if (editingId) {
      await fetch(`https://e-business-backend-71ky.onrender.com/api/customers/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditingId(null);
    } else {
      await fetch("https://e-business-backend-71ky.onrender.com/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, balance: 0 })
      });
    }

    fetchBuyers();
    setForm({ name: "", phone: "", email: "", address: "" });
  };

  // DELETE
  const deleteCustomer = async (id) => {
    await fetch(`https://e-business-backend-71ky.onrender.com/api/customers/${id}`, {
      method: "DELETE"
    });
    fetchBuyers();
  };

  // EDIT
  const editCustomer = (buyer) => {
    setForm(buyer);
    setEditingId(buyer._id);
  };

  // SEARCH FILTER
  const filtered = buyersData.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  // TOTAL BALANCE
  const totalBalance = buyersData.reduce((sum, b) => sum + (b.balance || 0), 0);

  // CHART DATA
  const chartData = {
    labels: buyersData.map(b => b.name),
    datasets: [{
      label: "Balance",
      data: buyersData.map(b => b.balance || 0)
    }]
  };

  return (
    <div className="buyers-page">

      <h1>Buyers Dashboard</h1>

      {/* SUMMARY */}
      <div className="buyers-cards">
        <div className="buyers-card">
          <h4>Total Buyers</h4>
          <h2>{buyersData.length}</h2>
        </div>
        <div className="buyers-card">
          <h4>Total Balance</h4>
          <h2>₹{totalBalance}</h2>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="search-box"
        placeholder="Search buyer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
       {/* CHART */}
      <div className="buyers-graph">
        <h3>Buyer Balance Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* FORM */}
      <div className="buyers-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button onClick={saveCustomer}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

     

      {/* TABLE */}
      <div className="buyers-table">
        <h3>All Buyers</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((buyer) => (
                <tr key={buyer._id}>
                  <td>{buyer.name}</td>
                  <td>{buyer.phone}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.address}</td>
                  <td>
                    <button onClick={() => editCustomer(buyer)}>Edit</button>
                    <button onClick={() => deleteCustomer(buyer._id)}>Delete</button>
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

export default Buyersinfo;