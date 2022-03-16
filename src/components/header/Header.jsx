import React, { useRef } from "react";
import "./header.css";
import { connect } from "react-redux";
import {
  setFilter,
  mailListAndBodyView,
  setSelectedEmail,
  removeFromUnread,
} from "../../redux/actions";

function Header({
  setFilter,
  currentFilter,
  mailListAndBodyView,
  setSelectedEmail,
  removeFromUnread,
  selectedEmail,
}) {
  const unreadRef = useRef(null);
  const readRef = useRef(null);
  const favouriteRef = useRef(null);

  const refArr = [unreadRef, readRef, favouriteRef];

  const onClickFilter = (value, reference) => {
    refArr.forEach((element) => {
      if (element.current !== reference.current) {
        element.current.classList.remove("fliter-background");
      }
    });
    reference.current.classList.toggle("fliter-background");
    if (selectedEmail) {
      removeFromUnread(selectedEmail.id);
    }
    if (currentFilter === value) {
      setFilter(null);
      mailListAndBodyView(false);
      setSelectedEmail(null);
    } else {
      setFilter(value);
      mailListAndBodyView(false);
      setSelectedEmail(null);
    }
  };

  return (
    <div className="header">
      <div className="filter">Filter By:</div>
      <div
        ref={unreadRef}
        onClick={() => {
          onClickFilter("unread", unreadRef);
        }}
        className="unread"
      >
        Unread
      </div>
      <div
        ref={readRef}
        onClick={() => {
          onClickFilter("read", readRef);
        }}
        className="read"
      >
        Read
      </div>
      <div
        ref={favouriteRef}
        onClick={() => {
          onClickFilter("favourite", favouriteRef);
        }}
        className="favourite"
      >
        Favourites
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentFilter: state.filter, selectedEmail: state.selectedEmail };
};

const createConnect = connect(mapStateToProps, {
  setFilter,
  mailListAndBodyView,
  setSelectedEmail,
  removeFromUnread,
});

export default createConnect(Header);
