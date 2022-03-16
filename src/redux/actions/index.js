import emailApi from "../../emailApi";

// Action creater for getting emails.
const fetchEmails = () => {
  return async (dispatch) => {
    const emails = await emailApi.get("/");
    dispatch({ type: "FETCH_EMAIL", payload: emails.data.list });
  };
};

// Action creater for getting the email body.
const fetchBody = (id) => {
  return async (dispatch) => {
    const body = await emailApi.get(`/?id=${id}`);
    dispatch({ type: "FETCH_BODY", payload: body.data });
  };
};

// Action creater for mailListAndBodyView.
const mailListAndBodyView = (value) => {
  return { type: "BODY_VIEW", payload: value };
};

// Action creater for selected video
const setSelectedEmail = (email) => {
  return { type: "SELECTED_EMAIL", payload: email };
};

// Action creater for filter.
const setFilter = (value) => {
  return { type: "SET_FILTER", payload: value };
};

// Action creater for when page loads putting all emails to unread.
const fetchUnread = () => {
  return async (dispatch) => {
    const emails = await emailApi.get("/");
    dispatch({ type: "FETCH_UNREAD", payload: emails.data.list });
  };
};

// Action creater for removing email from unread after reading.
const removeFromUnread = (id) => {
  return { type: "REMOVE_FROM_UNREAD", payload: id };
};

// Action creater for adding mails to read.
const addToRead = (email) => {
  return { type: "ADD_TO_READ", payload: email };
};

// Action creater for adding to favourites
const addToFavourites = (email) => {
  return { type: "ADD_TO_FAVOURITES", payload: email };
};

// Action creater for removing favourites
const removeFromFavourites = (id) => {
  return { type: "REMOVE_FROM_FAVOURITES", payload: id };
};

export {
  fetchEmails,
  fetchBody,
  fetchUnread,
  removeFromUnread,
  addToRead,
  addToFavourites,
  setFilter,
  mailListAndBodyView,
  setSelectedEmail,
  removeFromFavourites,
};
