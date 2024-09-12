import React from "react";
import "./header.css";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="header">
      <p className="header-text">Awesome Kanban Board</p>
      <Profile />
    </div>
  );
};

export default Header;