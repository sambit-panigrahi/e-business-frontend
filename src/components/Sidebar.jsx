import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState(null);

  const navigate = useNavigate();

const handleLogout = () => {
  // optional: clear auth data
  localStorage.clear();

  // redirect to login page
  navigate("/");
};

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <h2>NAXORA</h2>
      </div>

      <div className="sidebar-menu">

        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        {/* Parties */}
        <div className="sidebar-section">
          <div
            className="section-title"
            onClick={() => toggleSection("parties")}
          >
            Parties
          </div>
          {openSection === "parties" && (
            <div className="section-links">
              <NavLink to="/CustomerValidation">Customers Validation</NavLink>
              <NavLink to="/Buyersinfo">Buyers Info</NavLink>
              <NavLink to="/Sellersinfo">Sellers Info</NavLink>
            </div>
          )}
        </div>

        {/* Inventory */}
        <div className="sidebar-section">
          <div
            className="section-title"
            onClick={() => toggleSection("inventory")}
          >
            Inventory
          </div>
          {openSection === "inventory" && (
            <div className="section-links">
              <NavLink to="/Productform">Product Form</NavLink>
              <NavLink to="/Productvalidation">Product Validation</NavLink>
              <NavLink to="/Stockdetails">Stock Details</NavLink>
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="sidebar-section">
          <div
            className="section-title"
            onClick={() => toggleSection("transactions")}
          >
            Transactions
          </div>
          {openSection === "transactions" && (
            <div className="section-links">
              <NavLink to="/Purchases">Purchases</NavLink>
              <NavLink to="/Sales">Sales</NavLink>
            </div>
          )}
        </div>

        {/* Finance */}
        <div className="sidebar-section">
          <div
            className="section-title"
            onClick={() => toggleSection("finance")}
          >
            Finance
          </div>
          {openSection === "finance" && (
            <div className="section-links">
              <NavLink to="/Payments">Payments</NavLink>
              <NavLink to="/LoanDetails">Loan Details</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/Report" className="sidebar-link">
          Reports
        </NavLink>

        <NavLink to="/Settings" className="sidebar-link">
          Settings
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

      </div>
    </aside>
  );
};

export default Sidebar;
