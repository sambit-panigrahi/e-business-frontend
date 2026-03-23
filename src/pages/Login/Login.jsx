import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("https://e-business-backend-71ky.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user data
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">
          <h2>Welcome Back</h2>
          <img src="bus-1.jpg" alt="Login Visual" />
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-box">
            <h3>Log In</h3>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="register-text">
              Don’t have an account?{" "}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;