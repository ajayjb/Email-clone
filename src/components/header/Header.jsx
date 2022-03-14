import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-spc">Filter By:</div>
      <div className="header-spc">Unread</div>
      <div className="header-spc">Read</div>
      <div className="header-spc">Favorites</div>
    </div>
  );
}

export default Header;
