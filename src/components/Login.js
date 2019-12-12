import React, { Fragment } from "react";
import Axios from "axios";

import { Form, Label, Message, Grid, Menu } from "semantic-ui-react";
import { withRouter } from "react-router";

class Login extends React.Component {
  state = {
    error: false,
    email: "",
    password: "",
    submittedName: "",
    submittedEmail: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    this.getLoginUserRequest(email, password).then(result => {
      if (result.data.success) {
        this.props.history.push(`/dashboard`, { user: result.data.user });
      } else {
        this.setState({ error: true });
      }
    });
  };

  getLoginUserRequest = (email, password) => {
    return Axios({
      method: "post",
      params: {
        email: email,
        password: password
      },
      url: "http://127.0.0.1:8000" + "/user/login",
      withCredentials: true
    });
  };

  render() {
    return (
      <Fragment>
        <Menu>
          <Menu.Item header> SprachCafe</Menu.Item>
        </Menu>
        <Grid centered padded>
          <Form
            error={this.state.error}
            onSubmit={this.handleSubmit}
            style={{ width: "360px" }}
          >
            <Form.Field>
              <label> email address</label>
              <Form.Input
                onChange={this.handleChange}
                name="email"
                placeholder="email address"
              />
            </Form.Field>
            <Form.Field>
              <label> password</label>
              <Form.Input
                onChange={this.handleChange}
                name="password"
                placeholder="password"
              />
            </Form.Field>
            <Message error> incorrect password</Message>
            <Form.Button type="submit"> login</Form.Button>
          </Form>
        </Grid>
      </Fragment>
    );
  }
}

Login = withRouter(Login);

export default Login;
