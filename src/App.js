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
      <Menu>
        <Link to="/">
          <Menu.Item header> Kiefer</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="star outline" color="yellow" size="large" />{" "}
            <Label color="teal">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="handshake outline" color="blue" size="large" />{" "}
            <Label color="teal">3</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="hand peace outline" color="purple" size="large" />{" "}
            <Label color="teal">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="graduation cap" color="yellow" size="large" /> 13
            <Label color="yellow">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="heart outline" color="olive" size="large" /> 13
            <Label color="yellow">1</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
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
