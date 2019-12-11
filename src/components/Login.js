import React from "react";
import Axios from "axios";

import { Form, Label, Input, Message } from "semantic-ui-react";

class Login extends React.Component {
  state = { error:false, email: "", password: "", submittedName: "", submittedEmail: "" };


  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    this.getLoginUserRequest(email, password).then(result => {
        if(result.data.success){
            this.props.history.push(`/dashboard`)
        } else {
            this.setState({"error": true})
        }
    })
  };

  getLoginUserRequest = (email, password) => {
    return Axios({
        method: "post",
        params: {
            email: email,
            password: password,
        },
        url: "192.168.123.5:8000" + "/user/login",
        withCredentials: true
    })
  }

  render() {
    return (
      <Form error={this.state.error} onSubmit={this.handleSubmit}>
          <Form.Group>
          <Form.Field>
          <Label> email address</Label>
          <Form.Input onChange={this.handleChange} name="email" placeholder="email address" />
        </Form.Field>
        <Form.Field>
          <Label> password</Label>
          <Form.Input onChange={this.handleChange} name="password" placeholder="password" />
        </Form.Field>
        <Message error> incorrect password</Message>
        <Form.Button type="submit"> login</Form.Button>

          </Form.Group>

      </Form>
    );
  }
}

export default Login;
