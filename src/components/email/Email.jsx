import React, { useRef } from "react";
import { connect } from "react-redux";
import "./email.css";

function Email({ email, onEmailClick, border, fav, readEmails }) {
  const ref = useRef(null);
  if (readEmails.includes(email.id)) {
    var readBackground = { ...border, backgroundColor: "#f2f2f2" };
  }
  const { from, subject, date, short_description } = email;
  const localDate = new Date(date).toLocaleDateString();
  const localTime = new Date(date).toLocaleTimeString();
  return (
    <div
      className="email"
      onClick={() => {
        onEmailClick(email);
      }}
      style={readBackground}
      ref={ref}
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
        <div className="date-fav">
          <div className="date">{`${localDate} ${localTime}`}</div>
          <div className="favourite-master">{fav}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { readEmails: Object.keys(state.read) };
};

const createConnect = connect(mapStateToProps);

export default createConnect(Email);
