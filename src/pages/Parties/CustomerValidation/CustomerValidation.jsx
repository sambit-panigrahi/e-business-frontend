import React from "react";
import "./CustomerValidation.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const validationData = [
  { name: "Verified", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Rejected", value: 10 }
];

const COLORS = ["#FACC15", "#6B7280", "#1F2937"];

function CustomerValidation() {
  return (
    <div className="validation-page">
      <h1>Customer Validation</h1>

      {/* Summary Cards */}
      <div className="validation-cards">
        <div className="card">
          <h4>Total Customers</h4>
          <h2>100</h2>
        </div>
        <div className="card">
          <h4>Verified</h4>
          <h2>70</h2>
        </div>
        <div className="card">
          <h4>Pending</h4>
          <h2>20</h2>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="validation-graph">
        <h3>Validation Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={validationData}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
            >
              {validationData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="validation-table">
        <h3>Customer List</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Binay Traders</td>
                <td>Pending</td>
                <td><button className="approve-btn">Approve</button></td>
              </tr>
              <tr>
                <td>Prasad Mart</td>
                <td>Verified</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerValidation;