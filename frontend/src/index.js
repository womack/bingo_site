import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import PrivateSheet from "./PrivateSheet";
import "./index.css";
function getTimeRemaining() {
  var t = new Date(1585267200000) - new Date();
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

ReactDOM.render(
  <div className="App">
    <div className="bingo_info">
      <h1>VTG EASTER BINGO</h1>
      <h2>Active for {getTimeRemaining().days} days, {getTimeRemaining().hours} hours, {getTimeRemaining().minutes} minutes</h2>
    </div>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/sheet/:id">
          <PrivateSheet />
        </Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
