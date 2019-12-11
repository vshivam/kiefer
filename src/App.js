import React from "react";
import Login from "./components/Login"
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {Menu} from "semantic-ui-react"
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Menu />
      <center>
      <div style={{maxWidth: "720px"}}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
      </center>

    </Router>
  );
}

export default App;
