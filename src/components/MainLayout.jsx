import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <Navbar />

        {/* Page Content */}
        <div style={{ flex: 1, padding: "80px 20px 20px 20px" }}>
          <Outlet />
        </div>

        {/* Footer INSIDE main */}
        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;
