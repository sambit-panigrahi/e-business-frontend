import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalSales: 0,
    totalPurchases: 0,
    totalProfit: 0,
    pendingPayments: 0,
    stockAvailable: 0,
    recentActivities: [],
    chartData: {},
    monthlySales: []
  });

  useEffect(() => {
    fetch("http://https://e-business-backend-71ky.onrender.com//api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  // BAR CHART
  const chartData = {
    labels: ["Sales", "Purchases", "Profit"],
    datasets: [
      {
        data: [
          stats.chartData?.sales || 0,
          stats.chartData?.purchases || 0,
          stats.chartData?.profit || 0
        ],
        backgroundColor: [
          "rgba(245,197,24,0.9)",
          "rgba(245,197,24,0.6)",
          "rgba(245,197,24,0.3)"
        ],
        borderRadius: 8
      }
    ]
  };

  const barOptions = {
    plugins: { legend: { display: false } }
  };

  // LINE CHART
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: stats.monthlySales?.length
          ? stats.monthlySales
          : [12000, 19000, 15000, 22000, 18000, 25000],
        borderColor: "#f5c518",
        backgroundColor: "rgba(245,197,24,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const lineOptions = {
    plugins: { legend: { display: false } }
  };

  return (
    <div className="dashboard">

      <h2 className="dashboard-title">Business Overview</h2>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div className="chart-section" style={{ flex: 1 }}>
          <h3>Performance</h3>
          <div className="chart-box">
            <Bar data={chartData} options={barOptions} />
          </div>
        </div>

        <div className="chart-section" style={{ flex: 1 }}>
          <h3>Sales Trend</h3>
          <div className="chart-box">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="cards">
        <div className="card"><h4>Total Sales</h4><p>₹{stats.totalSales}</p></div>
        <div className="card"><h4>Total Purchases</h4><p>₹{stats.totalPurchases}</p></div>
        <div className="card"><h4>Total Profit</h4><p>₹{stats.totalProfit}</p></div>
        <div className="card"><h4>Pending Payments</h4><p>₹{stats.pendingPayments}</p></div>
        <div className="card"><h4>Stock Available</h4><p>{stats.stockAvailable} Items</p></div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="recent">
        <h3>Recent Activities</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentActivities?.length ? (
              stats.recentActivities.map((a, i) => (
                <tr key={i}>
                  <td>{a.type}</td>
                  <td>{a.name}</td>
                  <td>₹{a.amount}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">No recent activities</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ABOUT */}
      <section className="about-section">
        <h2>About NAXORA</h2>
        <p>
          NAXORA is a modern wholesale business management platform designed
          to streamline inventory, sales tracking, supplier handling,
          and financial analytics.
        </p>
        <p>
          We focus on scalability, reliability, and smart decision-making tools.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section">
        <h2>Our Experience & Recognition</h2>

        <div className="experience-gallery">
          <div className="exp-card">
            <img src="bus-5.png" alt="" />
            <p>ISO Certified Business</p>
          </div>

          <div className="exp-card">
            <img src="bus-7.jpg" alt="" />
            <p>Best Platform 2025</p>
          </div>

          <div className="exp-card">
            <img src="bus-6.avif" alt="" />
            <p>500+ Clients</p>
          </div>

          <div className="exp-card">
            <img src="bus-8.png" alt="" />
            <p>Top Business Solution</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section">
        <h2 className="contact-title">Get in Touch</h2>

        <div className="contact-wrapper">

          <div className="contact-info">
            <h3>Let’s Build Something Great</h3>
            <p>Contact us for support, collaboration or business queries.</p>

            <div className="info-item">📧 support@naxora.com</div>
            <div className="info-item">📞 +91 98765 43210</div>
            <div className="info-item">📍 Bhubaneswar, India</div>
          </div>

          <div className="contact-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" rows="5"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;