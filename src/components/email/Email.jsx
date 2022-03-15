import React from "react";
import "./email.css";

function Email({ email, onEmailClick }) {
  const { from, subject, date, short_description } = email;
  const localDate = new Date(date).toLocaleDateString();
  const localTime = new Date(date).toLocaleTimeString();
  return (
    <div
      className="email"
      onClick={() => {
        onEmailClick(email);
      }}
    >
      <div className="profile">
        <div className="profile-pic">{from.name[0].toUpperCase()}</div>
      </div>
      <div className="desc">
        <div className="name">
          From: <strong>{`${from.name} <${from.email}>`}</strong>
        </div>
        <div className="subject">
          Subject: <strong>{subject}</strong>
        </div>
        <div className="smallDesc">{short_description}</div>
        <div className="date">{`${localDate} ${localTime}`}</div>
      </div>
    </div>
  );
}

export default Email;
