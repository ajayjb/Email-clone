import React from "react";
import Email from "../email/Email";
import { useEffect, useState } from "react";
import {
  fetchEmails,
  fetchBody,
  fetchUnread,
  mailListAndBodyView,
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
}) {
  const [selectedEmail, setSelectedMail] = useState(null);

  const selectedCSS = {
    border: "solid 2px #e54065",
  };

  useEffect(() => {
    fetchEmails();
    fetchUnread();
  }, []);

  const onEmailClick = (e) => {
    fetchBody(e.id);
    setSelectedMail(e);
    mailListAndBodyView(true);
  };

  const mailRenderFullView = () => {
    return emails.map((e) => {
      if (selectedEmail && selectedEmail.id === e.id) {
        return (
          <div key={e.id}>
            <Email border={selectedCSS} onEmailClick={onEmailClick} email={e} />
          </div>
        );
      }
      return (
        <div key={e.id}>
          <Email boder={null} onEmailClick={onEmailClick} email={e} />
        </div>
      );
    });
  };

  const renderFullMailBody = () => {
    return (
      <div className="master-slave">
        <div className="master">{mailRenderFullView()}</div>
        <div className="slave">
          <EmailBody email={selectedEmail} body={body[selectedEmail.id]} />
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
    var emails = state.read;
  } else if (state.filter === "favourite") {
    var emails = state.favourite;
  } else {
    var emails = state.emails;
  }
  return {
    emails: emails,
    body: state.emailsBody,
    currentFilter: state.filter,
    bodyView: state.bodyView,
  };
};

const createConnect = connect(mapStateToProps, {
  fetchEmails,
  fetchBody,
  fetchUnread,
  mailListAndBodyView,
});

export default createConnect(Emails);
