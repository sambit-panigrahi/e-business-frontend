import React from "react";
import "./Purchases.css";

import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Purchases() {

  const purchases = [
    { id: 1, supplier: "ABC Traders", product: "Laptop", quantity: 10, amount: 50000 },
    { id: 2, supplier: "Tech World", product: "Keyboard", quantity: 25, amount: 12500 },
    { id: 3, supplier: "Digital Hub", product: "Monitor", quantity: 8, amount: 40000 },
  ];

  const purchaseChartData = {
    labels: purchases.map(p => p.supplier),
    datasets: [
      {
        label: "Purchase Amount",
        data: purchases.map(p => p.amount),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
      }
    ]
  };

  return (
    <div className="purchase-container">
      <h2 className="purchase-title">Purchases</h2>

      {/* Summary Cards */}
      <div className="purchase-summary">
        <div className="summary-card">
          <h4>Total Purchases</h4>
          <p>{purchases.length}</p>
        </div>

        <div className="summary-card">
          <h4>Total Amount</h4>
          <p>
            ₹{purchases.reduce((sum, item) => sum + item.amount, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="purchase-table">
        <table>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((item) => (
              <tr key={item.id}>
                <td>{item.supplier}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Added */}
      <div className="purchase-charts">

        <h3>Purchase Distribution</h3>
        <Pie data={purchaseChartData} />

        <h3>Supplier Comparison</h3>
        <Bar data={purchaseChartData} />

      </div>

    </div>
  );
}

export default Purchases;