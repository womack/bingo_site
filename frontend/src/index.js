import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import PrivateSheet from "./PrivateSheet";
import "./index.css";

ReactDOM.render(
  <div className="App">
    <div className="bingo_info">
      <h1>VTG EASTER BINGO</h1>
      <h2>Running for X more days</h2>
    </div>
    <Router>
      <Switch>
        <Route path="/sheet/:id">
          <PrivateSheet />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
        <Router>
          <App />
        </Router>
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
