import React from "react";
import Email from "../email/Email";
import { useEffect, useState } from "react";
import {
  fetchEmails,
  fetchBody,
  fetchUnread,
  mailListAndBodyView,
  setSelectedEmail,
  addToRead,
  removeFromUnread,
} from "../../redux/actions";
import { connect } from "react-redux";
import EmailBody from "../emailBody/EmailBody";
import "./emails.css";

function Emails({
  emails,
  fetchEmails,
  fetchBody,
  body,
  fetchUnread,
  bodyView,
  mailListAndBodyView,
  setSelectedEmail,
  selectedEmail,
  addToRead,
  removeFromUnread,
}) {
  console.log("screen up");
  const [removeUnread, setRemoveUnread] = useState(false);
  const selectedCSS = {
    border: "solid 2px #e54065",
  };

  useEffect(() => {
    fetchEmails();
    fetchUnread();
  }, []);

  // To remove from unread after only reading. Whenever you click on email it will return cleanup function, which will run when screen re-render.
  useEffect(() => {
    return () => {
      if (selectedEmail) {
        console.log("clean up");
        removeFromUnread(selectedEmail.id);
      }
    };
  }, [removeUnread]);

  const onEmailClick = (e) => {
    fetchBody(e.id);
    setSelectedEmail(e);
    mailListAndBodyView(true);
    addToRead(e);
    setRemoveUnread(!removeUnread);
  };

  // Mapping Email component to Email Array
  const mailRenderFullView = () => {
    return emails.map((e) => {
      const border =
        selectedEmail && selectedEmail.id === e.id ? selectedCSS : null;
      return (
        <div key={e.id}>
          <Email border={border} onEmailClick={onEmailClick} email={e} />
        </div>
      );
    });
  };

  const renderFullMailBody = () => {
    if (emails.length === 0) {
      var bodyValue = undefined;
    } else {
      var bodyValue = body[selectedEmail.id];
    }
    return (
      <div className="master-slave">
        <div className="master">{mailRenderFullView()}</div>
        <div className="slave">
          <EmailBody email={selectedEmail} body={bodyValue} />
        </div>
      </div>
    );
  };

  return <div>{bodyView ? renderFullMailBody() : mailRenderFullView()}</div>;
}

const mapStateToProps = (state) => {
  if (state.filter === "unread") {
    var emails = Object.values(state.unread);
  } else if (state.filter === "read") {
    emails = Object.values(state.read);
  } else if (state.filter === "favourite") {
    emails = Object.values(state.favourite);
  } else {
    emails = Object.values(state.emails);
  }
  return {
    emails: emails,
    body: state.emailsBody,
    currentFilter: state.filter,
    bodyView: state.bodyView,
    selectedEmail: state.selectedEmail,
  };
};

const createConnect = connect(mapStateToProps, {
  fetchEmails,
  fetchBody,
  fetchUnread,
  mailListAndBodyView,
  setSelectedEmail,
  addToRead,
  removeFromUnread,
});

export default createConnect(Emails);
