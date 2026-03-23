import React, { useState } from "react";
import "./Reports.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Report() {
  const [filter, setFilter] = useState("Monthly");

  // Sample data (you can later connect API here)
  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 7000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 9000 },
    { name: "May", sales: 6000 },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Business Reports</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="date-filter"
        >
          <option>Today</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="report-cards">
        <div className="report-card">
          <h4>Total Sales</h4>
          <p>₹ 1,20,000</p>
        </div>

        <div className="report-card">
          <h4>Total Purchases</h4>
          <p>₹ 80,000</p>
        </div>

        <div className="report-card profit-card">
          <h4>Net Profit</h4>
          <p>₹ 40,000</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h3>{filter} Sales Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#ffc107" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div className="transaction-report">
        <h3>Recent Transactions</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>20 Feb 2026</td>
              <td>Sale</td>
              <td>₹ 10,000</td>
              <td className="success">Completed</td>
            </tr>
            <tr>
              <td>19 Feb 2026</td>
              <td>Purchase</td>
              <td>₹ 7,000</td>
              <td className="pending">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;