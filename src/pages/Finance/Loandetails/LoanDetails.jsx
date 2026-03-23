import React, { useEffect, useState } from "react";
import "./LoanDetails.css";

const LoanDetails = () => {

  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    amount: "",
    interest: "",
    duration: ""
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/loans");
      const data = await res.json();
      setLoans(data);
    } catch (error) {
      console.log("Error fetching loans:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLoan = async () => {
    try {
      await fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        customer: form.customer,
        amount: Number(form.amount),
        interest: Number(form.interest),
        duration: Number(form.duration),
        status: "Pending"
      })
      });

      fetchLoans();
      setForm({ customer: "", amount: "", interest: "", duration: "" });
    } catch (error) {
      console.log("Error adding loan:", error);
    }
  };

  const deleteLoan = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/loans/${id}`, {
        method: "DELETE"
      });

      fetchLoans();
    } catch (error) {
      console.log("Error deleting loan:", error);
    }
  };

  return (
    <div className="loan-container">

      <h2 className="loan-title">Loan Details</h2>

      {/* ADD FORM */}
      <div className="loan-form">
        <input name="customer" placeholder="Customer Name" value={form.customer} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="interest" placeholder="Interest %" value={form.interest} onChange={handleChange} />
        <input name="duration" placeholder="Duration (months)" value={form.duration} onChange={handleChange} />
        <button onClick={addLoan}>Add Loan</button>
      </div>

      {/* TABLE */}
      <table className="loan-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Interest</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.customer}</td>
              <td>₹{loan.amount}</td>
              <td>{loan.interest}%</td>
              <td>{loan.status}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteLoan(loan._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default LoanDetails;