import React from "react";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Menu, Label, Icon, Container } from "semantic-ui-react";
import Dashboard from "./components/Dashboard";
import AssignmentDetails from "./components/assignment_details.";

function App() {
  return (
    <Router>
      <Container style={{ maxWidth: "720px" }}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/assignment_details">
            <AssignmentDetails />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
