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
  favouriteEmails,
}) {
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

  // Mapping Email component to email Array
  const mailRenderFullView = () => {
    return emails.map((e) => {
      if (selectedEmail && selectedEmail.id === e.id) {
        if (favouriteEmails.includes(e.id)) {
          return (
            <div key={e.id}>
              <Email
                border={selectedCSS}
                onEmailClick={onEmailClick}
                email={e}
                fav={"Favourite"}
              />
            </div>
          );
        } else {
          return (
            <div key={e.id}>
              <Email
                border={selectedCSS}
                onEmailClick={onEmailClick}
                email={e}
                fav={""}
              />
            </div>
          );
        }
      } else if (favouriteEmails.includes(e.id)) {
        return (
          <div key={e.id}>
            <Email
              boder={null}
              onEmailClick={onEmailClick}
              email={e}
              fav={"Favourite"}
            />
          </div>
        );
      } else {
        return (
          <div key={e.id}>
            <Email
              boder={null}
              onEmailClick={onEmailClick}
              email={e}
              fav={""}
            />
          </div>
        );
      }
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
    var emails = Object.values(state.read);
  } else if (state.filter === "favourite") {
    var emails = Object.values(state.favourite);
  } else {
    var emails = Object.values(state.emails);
  }
  return {
    emails: emails,
    body: state.emailsBody,
    currentFilter: state.filter,
    bodyView: state.bodyView,
    selectedEmail: state.selectedEmail,
    favouriteEmails: Object.keys(state.favourite),
    readEmails: Object.keys(state.read),
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
