
import React from "react";
import {
  MdOutlineMail,
  MdDashboard,
  MdSend,
  MdHistory
} from "react-icons/md";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <MdOutlineMail />
        <span>MailFlow</span>
      </div>

      <div className="nav-links">
        <a href="#dashboard">
          <MdDashboard />
          Dashboard
        </a>

        <a href="#compose">
          <MdSend />
          Compose
        </a>

        <a href="#history">
          <MdHistory />
          History
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
