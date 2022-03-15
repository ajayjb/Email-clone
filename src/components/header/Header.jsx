import React from "react";
import "./header.css";
import { connect } from "react-redux";
import { setFilter, mailListAndBodyView } from "../../redux/actions";

function Header({ setFilter, currentFilter, mailListAndBodyView }) {
  const onClickFilter = (value) => {
    if (currentFilter == value) {
      setFilter(null);
    } else {
      setFilter(value);
    }
  };

  return (
    <div className="header">
      <div className="filter">Filter By:</div>
      <div
        onClick={() => {
          onClickFilter("unread");
          mailListAndBodyView(false);
        }}
        className="unread"
      >
        Unread
      </div>
      <div
        onClick={() => {
          onClickFilter("read");
          mailListAndBodyView(false);
        }}
        className="read"
      >
        Read
      </div>
      <div
        onClick={() => {
          onClickFilter("favourite");
          mailListAndBodyView(false);
        }}
        className="favourite"
      >
        Favorites
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentFilter: state.filter };
};

const createConnect = connect(mapStateToProps, {
  setFilter,
  mailListAndBodyView,
});

export default createConnect(Header);
