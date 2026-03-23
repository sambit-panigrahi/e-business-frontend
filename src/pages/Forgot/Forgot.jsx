import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");

        const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
            alert(data.message);
            } else {
            alert(data.message);
            }
        } catch (error) {
            alert("Server error");
        }
        };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">

        {/* Left Panel */}
        <div className="forgot-left">
          <img src="bus-2.png" alt="" className="forgot-img" />
        </div>

        {/* Right Panel */}
        <div className="forgot-right">
          <div className="forgot-box">
            <h3>Reset Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="forgot-btn">
                Send Reset Link
              </button>
            </form>

            <p className="back-text">
              Remember your password?{" "}
              <Link to="/" className="back-link">
                Back to Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Forgot;

