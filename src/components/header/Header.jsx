import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="filter">Filter By:</div>
      <div className="unread">Unread</div>
      <div className="read">Read</div>
      <div className="favorite">Favorites</div>
    </div>
  );
}

export default Header;
