import React from "react";
import Header from "./header/Header";
import { browserRouter as router, routes, route } from "react-router-dom";
import Emails from "./emails/Emails";

function App() {
  return (
    <div className="container">
      <Header />
      <Emails />
    </div>
  );
}

export default App;
