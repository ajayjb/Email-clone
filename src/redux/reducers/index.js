import { combineReducers } from "redux";

const fetchEmailReducer = (email = [], action) => {
  switch (action.type) {
    case "FETCH_EMAIL":
      return action.payload;
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

export default combineReducers({
  emails: fetchEmailReducer,
  emailsBody: fetchbodyReducer,
});
