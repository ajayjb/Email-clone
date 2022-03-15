import React from "react";
import "./emailBody.css";

function EmailBody({ email, body }) {
  if (body === undefined) {
    return <></>;
  }
  const { from, subject, date, short_description } = email;
  const localDate = new Date(date).toLocaleDateString();
  const localTime = new Date(date).toLocaleTimeString();
  return (
    <div className="email-body">
      <div className="profile-body">
        <div className="profile-pic-body">{from.name[0].toUpperCase()}</div>
      </div>
      <div className="body">
        <div className="title">
          <div className="name">
            <strong>{subject}</strong>
          </div>
          <div className="fav">mark as favorite</div>
        </div>
        <div className="date-body">{`${localDate} ${localTime}`}</div>
        <div className="para">
          <>{body.body}</>
        </div>
      </div>
    </div>
  );
}

export default EmailBody;
