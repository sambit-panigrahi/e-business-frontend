import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forgot from "./pages/Forgot/Forgot";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sellersinfo from "./pages/Parties/Sellersinfo/Sellersinfo";
import Buyersinfo from "./pages/Parties/Buyersinfo/Buyersinfo";
import CustomerValidation from "./pages/Parties/CustomerValidation/CustomerValidation";
import Productform from "./pages/Inventory/Productform/Productform"
import Productvalidation from "./pages/Inventory/Productvalidation/Productvalidation"
import Stockdetails from "./pages/Inventory/Stockdetails/Stockdetails"
import Purchases from "./pages/Transaction/Purchases/Purchases";
import Sales from "./pages/Transaction/Sales/Sales";
import LoanDetails from "./pages/Finance/Loandetails/LoanDetails";
import Payments from "./pages/Finance/Payments/Payments";
import Report from "./pages/Reports/Reports"; 
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />

      <Route element={<MainLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Sellersinfo" element={<Sellersinfo />} />
        <Route path="/Buyersinfo" element={<Buyersinfo />} />
        <Route path="/CustomerValidation" element={<CustomerValidation />} />
        <Route path="/Productform" element={<Productform />} />
        <Route path="/Productvalidation" element={<Productvalidation />} />
        <Route path="/Stockdetails" element={<Stockdetails />} />
        <Route path="/Purchases" element={<Purchases />} />
        <Route path="/Sales" element={<Sales />} />
        <Route path="/LoanDetails" element={<LoanDetails />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/Settings" element={<Settings />} />

        

      </Route>

    </Routes>
  );
}

export default App;
