import React from "react";
import Email from "../email/Email";
import { useEffect, useState } from "react";
import { fetchEmails, fetchBody } from "../../redux/actions";
import { connect } from "react-redux";
import EmailBody from "../emailBody/EmailBody";
import "./emails.css";

function Emails({ emails, fetchEmails, fetchBody, body }) {
  const [masterSlave, setMasterSlave] = useState(false);
  const [selectedEmail, setSelectedMail] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const onEmailClick = (e) => {
    fetchBody(e.id);
    setSelectedMail(e);
    setMasterSlave(true);
  };

  const mailRenderFullView = () => {
    return emails.map((e) => {
      return (
        <div key={e.id}>
          <Email onEmailClick={onEmailClick} email={e} />
        </div>
      );
    });
  };

  const renderMasterSlave = () => {
    return (
      <div className="master-slave">
        <div className="master">{mailRenderFullView()}</div>
        <div className="slave">
          <EmailBody email={selectedEmail} body={body[selectedEmail.id]} />
        </div>
      </div>
    );
  };

  return <div>{masterSlave ? renderMasterSlave() : mailRenderFullView()}</div>;
}

const mapStateToProps = (state) => {
  return { emails: state.emails, body: state.emailsBody };
};

const createConnect = connect(mapStateToProps, { fetchEmails, fetchBody });

export default createConnect(Emails);
