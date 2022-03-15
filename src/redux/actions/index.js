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

export { fetchEmails, fetchBody };
