import { combineReducers } from "redux";
import _ from "lodash";

const fetchEmailReducer = (email = {}, action) => {
  switch (action.type) {
    case "FETCH_EMAIL":
      let temp = {};
      action.payload.forEach((element) => {
        temp = { ...temp, [element.id]: element };
      });
      return temp;
    default:
      return email;
  }
};

const fetchbodyReducer = (body = {}, action) => {
  switch (action.type) {
    case "FETCH_BODY":
      return { ...body, [action.payload.id]: action.payload };
    default:
      return body;
  }
};

const mailBodyViewReducer = (bodyView = false, action) => {
  switch (action.type) {
    case "BODY_VIEW":
      return action.payload;
    default:
      return bodyView;
  }
};

const setFilterReducer = (filter = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return filter;
  }
};

const selectedEmailReducer = (email = null, action) => {
  switch (action.type) {
    case "SELECTED_EMAIL":
      return action.payload;
    default:
      return email;
  }
};

const unreadReducer = (unread = {}, action) => {
  switch (action.type) {
    case "FETCH_UNREAD":
      let temp = {};
      action.payload.forEach((element) => {
        temp = { ...temp, [element.id]: element };
      });
      return temp;
    case "REMOVE_FROM_UNREAD":
      return _.omit(unread, [action.payload]);
    default:
      return unread;
  }
};

const readReducer = (read = {}, action) => {
  switch (action.type) {
    case "ADD_TO_READ":
      return { ...read, [action.payload["id"]]: action.payload };
    default:
      return read;
  }
};

const favouriteReducer = (favourite = {}, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      return { ...favourite, [action.payload["id"]]: action.payload };
    case "REMOVE_FROM_FAVOURITES":
      return _.omit(favourite, [action.payload]);
    default:
      return favourite;
  }
};

export default combineReducers({
  emails: fetchEmailReducer,
  emailsBody: fetchbodyReducer,
  unread: unreadReducer,
  read: readReducer,
  favourite: favouriteReducer,
  filter: setFilterReducer,
  bodyView: mailBodyViewReducer,
  selectedEmail: selectedEmailReducer,
});
