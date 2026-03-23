import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">System Settings</h2>

      <form onSubmit={handleSubmit} className="settings-form">

        {/* Business Info */}
        <div className="settings-section">
          <h3>Business Information</h3>

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Business Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Business Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Password Section */}
        <div className="settings-section">
          <h3>Change Password</h3>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;