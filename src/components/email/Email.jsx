import React from "react";
import "./email.css";

function Email() {
  return (
    <div className="email">
      <div className="profile-pic">
        <div>{`E`}</div>
      </div>
      <div className="desc">
        <div className="name">
          From: <strong>{`Elon Musk <elon.musk@gmail.com>`}</strong>
        </div>
        <div className="subject">
          Subject: <strong>{`Lorem ipsum`}</strong>
        </div>
        <div className="smallDesc">
          {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, beatae!`}
        </div>
        <div className="date">10202021 10:30AM</div>
      </div>
    </div>
  );
}

export default Email;
