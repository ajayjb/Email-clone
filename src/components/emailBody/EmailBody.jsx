import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  mailListAndBodyView,
  fetchBody,
  removeFromUnread,
} from "../../redux/actions";
import "./emailBody.css";

function EmailBody({
  email,
  body,
  currentFilter,
  removeFromFavourites,
  addToFavourites,
  mailListAndBodyView,
}) {
  if (body === undefined) {
    return <></>;
  }
  const { from, subject, date, short_description } = email;
  const localDate = new Date(date).toLocaleDateString();
  const localTime = new Date(date).toLocaleTimeString();

  const onFavAddClickHandler = (mail) => {
    addToFavourites(mail);
  };

  const onFavRemoveClickHandler = (id) => {
    removeFromFavourites(id);
    mailListAndBodyView(false);
  };

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
          {currentFilter !== "favourite" ? (
            <div
              onClick={() => {
                onFavAddClickHandler(email);
              }}
              className="fav"
            >
              mark as favourite
            </div>
          ) : (
            <div
              onClick={() => {
                onFavRemoveClickHandler(email.id);
              }}
              className="fav"
            >
              Remove from favourite
            </div>
          )}
        </div>
        <div className="date-body">{`${localDate} ${localTime}`}</div>
        <div className="para" dangerouslySetInnerHTML={{ __html: body.body }} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentFilter: state.filter };
};

const createConnect = connect(mapStateToProps, {
  addToFavourites,
  removeFromFavourites,
  mailListAndBodyView,
  fetchBody,
  removeFromUnread,
});

export default createConnect(EmailBody);
