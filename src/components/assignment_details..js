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
    submissions: [{ text: "yo" }],
    alreadySubmitted: true
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
        console.log(result.data.posts);
        this.setState({
          submissions: result.data.posts,
          alreadySubmitted: result.data.submitted
        });
      }
    });
  };

  renderFriendSubmission = submission => {
    return (
      <Card fluid>
        <Card.Content>{submission.text}</Card.Content>
        <Card.Description>
          {submission.amazing_story}{" "}
          <Icon as="link" name="star outline" color="yellow" size="large" onClick={() => this.vote("amazing_story", submission.mongoid)}/>
          {submission.well_written}{" "}
          <Icon as="link" name="handshake outline" color="blue" size="large"  onClick={() => this.vote("well_written", submission.mongoid)}/>
          {submission.hilarious}{" "}
          <Icon as="link" name="hand peace outline" color="purple" size="large"  onClick={() => this.vote("hilarious", submission.mongoid)}/>
        </Card.Description>
        <Card.Description></Card.Description>
        <Card.Meta></Card.Meta>
      </Card>
    );
  };

  renderFriendSubmissions = submissions => {
    return (
      <Fragment>
        <Header> Your classmates said:</Header>
        {submissions.map(s => {
          return this.renderFriendSubmission(s);
        })}
      </Fragment>
    );
  };

  renderSubmissionForm = () => {
    return this.state.submissionSuccessful || this.state.alreadySubmitted ? (
      <Message success>
        {" "}
        Well done on finishing this assignment! Now check out posts from your
        friends and see what else you can learn.
      </Message>
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

  vote = (type, post_id) => {
      this.getVoteRequest(type, post_id).then(result => {
          if(result.data.success){
            this.getAllSubmissions();      
          }
      })
  }

  getVoteRequest = (type, post_id) => {
      let params = {}
      params[type]= true
      params[post_id] = post_id
    return Axios({
      method: "get",
      url: "http://127.0.0.1:8000" + "/user/reaction",
      params: params,
      withCredentials: true
    });
  };

  render = () => {
    console.log(this.props.location);
    return (
      <Fragment>
        {this.renderSubmissionForm()}
        {this.renderFriendSubmissions(this.state.submissions)}
      </Fragment>
    );
  };
}

AssignmentDetails = withRouter(AssignmentDetails);
export default AssignmentDetails;
