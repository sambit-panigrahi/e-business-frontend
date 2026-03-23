import React, { useEffect, useState } from "react";
import "./Payments.css";

const Payments = () => {

  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    amount: "",
    method: "",
    date: ""
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("https://e-business-backend-71ky.onrender.com/api/payments");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.log("Error fetching payments:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPayment = async () => {
    try {
      await fetch("https://e-business-backend-71ky.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer: form.customer,
          amount: Number(form.amount),
          method: form.method,
          date: new Date(form.date)
        })
      });

      fetchPayments();
      setForm({ customer: "", amount: "", method: "", date: "" });

    } catch (error) {
      console.log("Error adding payment:", error);
    }
  };

  const deletePayment = async (id) => {
    try {
      await fetch(`https://e-business-backend-71ky.onrender.comapi/payments/${id}`, {
        method: "DELETE"
      });

      fetchPayments();
    } catch (error) {
      console.log("Error deleting payment:", error);
    }
  };

  return (
    <div className="payments-container">

      <h2 className="payments-title">Payments</h2>

      {/* FORM */}
      <div className="payment-form">
        <input name="customer" placeholder="Customer Name" value={form.customer} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="method" placeholder="Method (Online/Offline)" value={form.method} onChange={handleChange} />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <button onClick={addPayment}>Add Payment</button>
      </div>

      {/* TABLE */}
      <table className="payments-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.customer}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.method}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
              <td>
                <button className="delete-btn" onClick={() => deletePayment(payment._id)}>
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

export default Payments;