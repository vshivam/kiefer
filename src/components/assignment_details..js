import React, { Fragment } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

import {
  Message,
  Grid,
  Label,
  Table,
  Tab,
  Icon,
  Divider,
  Form,
  TextArea,
  Header,
  Popup,
  Button,
  Container,
  Card
} from "semantic-ui-react";

class AssignmentDetails extends React.Component {
  state = {
    submissionSuccessful: false,
    submissions: []
  };

  componentDidMount = () => {
    this.getAllSubmissions();
  };

  getSubmissions = () => {};

  onCreateSubmission = () => {
    this.getNewSubmissionRequest(
      this.props.location.assignment.mongoid,
      this.state.submission_text
    ).then(result => {
      if (result.data.success) {
        console.log(result.data);
        this.setState({ submissionSuccessful: true });
      }
    });
  };

  onFormChange = (e, { name, value }) => this.setState({ [name]: value });

  getNewSubmissionRequest = (assignment_id, text) => {
    return Axios({
      method: "post",
      url: "http://127.0.0.1:8000" + "/user/submit",
      params: {
        assignment_id: assignment_id,
        text: text
      },
      withCredentials: true
    });
  };

  getAllPostsRequest = () => {
    return Axios({
      method: "get",
      url: "http://127.0.0.1:8000" + "/user/get_post",
      params: {
        assignment_id: this.props.location.assignment.mongoid
      },
      withCredentials: true
    });
  };

  getAllSubmissions = () => {
    this.getAllPostsRequest().then(result => {
      if (result.data.success) {
          console.log(result.data.posts)
        this.setState({ submissions: result.data.posts });
      }
    });
  };

  render = () => {
    console.log(this.props.location);
    return this.state.submissionSuccessful ? (
      <Message success> Well done!</Message>
    ) : (
      <Form onSubmit={this.onCreateSubmission}>
        <Header>{this.props.location.assignment.header}</Header>
        <Form.Field>
          <label>Give it your best shot!</label>
          <TextArea name="submission_text" onChange={this.onFormChange} />
        </Form.Field>
        <Message>
          Don't forget to include these words for extra points ;)
          <b>{this.props.location.assignment.keyword}</b>
        </Message>
        <Form.Button type="submit"> Submit</Form.Button>
      </Form>
    );
  };
}

AssignmentDetails = withRouter(AssignmentDetails);
export default AssignmentDetails;
