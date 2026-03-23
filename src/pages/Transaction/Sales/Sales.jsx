import React from "react";
import "./Sales.css";

import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Sales() {

  const sales = [
    { id: 1, customer: "Rahul", product: "Laptop", quantity: 2, amount: 120000 },
    { id: 2, customer: "Priya", product: "Keyboard", quantity: 5, amount: 5000 },
    { id: 3, customer: "Amit", product: "Mouse", quantity: 3, amount: 3000 },
  ];

  const salesChartData = {
    labels: sales.map(s => s.customer),
    datasets: [
      {
        label: "Sales Amount",
        data: sales.map(s => s.amount),
        backgroundColor: ["#c2d830", "#82b80e", "#5a5941"]
      }
    ]
  };

  return (
    <div className="sales-container">
      <h2 className="sales-title">Sales</h2>

      {/* Summary */}
      <div className="sales-summary">
        <div className="summary-card">
          <h4>Total Sales</h4>
          <p>{sales.length}</p>
        </div>

        <div className="summary-card">
          <h4>Total Revenue</h4>
          <p>
            ₹{sales.reduce((sum, item) => sum + item.amount, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((item) => (
              <tr key={item.id}>
                <td>{item.customer}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Added */}
      <div className="sales-charts">

        <h3>Sales Distribution</h3>
        <Pie data={salesChartData} />

        <h3>Customer Comparison</h3>
        <Bar data={salesChartData} />

      </div>

    </div>
  );
}

export default Sales;