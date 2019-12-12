import React, { Fragment } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

import {
  Message,
  Menu,
  Image,
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
  Card,
  Comment,
  Segment,
  Grid,
  Label
} from "semantic-ui-react";

class AssignmentDetails extends React.Component {
  state = {
    submissionSuccessful: false,
    submissions: [
      {
        mongoid: "1234",
        name: "Wiwi",
        text:
          "yoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyoyo",
        comments: [],
        new_comment_text: ""
      }
    ],
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

  renderVoteMenu = submission => {
    return (
      <Menu compact icon floated="right">
        <Menu.Item>
          <Icon
            name="star outline"
            color="yellow"
            size="large"
            onClick={() => this.vote("amazing_story", submission.mongoid)}
          />
          <Label color="grey">{submission.amazing_story}</Label>
        </Menu.Item>
        <Menu.Item>
          <Icon
            name="handshake outline"
            color="blue"
            size="large"
            onClick={() => this.vote("well_written", submission.mongoid)}
          />
          <Label color="grey">{submission.well_written}</Label>
        </Menu.Item>
        <Menu.Item>
          <Icon
            name="hand peace outline"
            color="purple"
            size="large"
            onClick={() => this.vote("hilarious", submission.mongoid)}
          />
          <Label color="grey">{submission.hilarious}</Label>
        </Menu.Item>
        {typeof this.props.location.user !== "undefined" &&
        this.props.location.user.role === "teacher" ? (
          <Fragment>
            <Menu.Item>
              <Icon name="graduation cap" color="yellow" size="large" />
              <Label color="yellow">1</Label>
            </Menu.Item>
            <Menu.Item>
              <Icon name="heart outline" color="olive" size="large" />
              <Label color="yellow">1</Label>
            </Menu.Item>{" "}
          </Fragment>
        ) : null}
      </Menu>
    );
  };

  renderComment(comment, name) {
    return (
      <Fragment>
        <Header as="h3" dividing>
          How did {name} do ?
        </Header>
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{comment.name}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Fragment>
    );
  }

  renderComments = (comments, name) => {
    comments.map(comment => {
      this.renderComment(comment, name);
    });
  };

  onNewCommentSubmit = submission_id => {
    this.getNewCommentRequest(submission_id, this.state.new_comment_text).then(
      result => {
        if (result.data.success) {
        }
      }
    );
  };

  getNewCommentRequest = (submission_id, text) => {
    return Axios({
      method: "post",
      url: "http://127.0.0.1:8000" + "/user/add_comment",
      params: {
        submission_id: submission_id,
        comment: text
      },
      withCredentials: true
    });
  };

  renderFriendSubmission = submission => {
    let getplaceholder = () => {
      return "Encourage " + submission.name + " ! Some grammar tips, perhaps ?";
    };
    return (
      <Segment color="teal">
        <Grid padded relaxed>
          <Grid.Row>
            <Grid.Column width="12">
              <Header>{submission.name} writes</Header>
            </Grid.Column>
            <Grid.Column width="4">
              {this.renderVoteMenu(submission)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{submission.text}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Comment.Group minimal size="mini">
                {this.renderComments(submission.comments, submission.name)}
                <Form
                  reply
                  onSubmit={() => this.onNewCommentSubmit(submission.mongoid)}
                >
                  <Form.TextArea
                    name="new_comment_text"
                    onChange={this.onCommentFormChange}
                    placeholder={getplaceholder()}
                  />
                  <Button
                    content="comment"
                    labelPosition="right"
                    icon="edit"
                    primary
                  />
                </Form>
              </Comment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  };

  renderFriendSubmissions = submissions => {
    return (
      <Fragment>
        <Header> Checkout your classmates' submissions</Header>
        {submissions.map(s => {
          return this.renderFriendSubmission(s);
        })}
      </Fragment>
    );
  };

  onCommentFormChange = (e, { name, value }) =>
    this.setState({ [name]: value });

  renderSubmissionForm = () => {
    return this.state.submissionSuccessful || this.state.alreadySubmitted ? (
      <Message success compact>
        <Message.Header>
          Well done on finishing this assignment!{" "}
        </Message.Header>
        Now check out posts from your friends and see what else you can learn.
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
          <b>{this.props.location.assignment.keyword.join(", ")}</b>
        </Message>
        <Form.Button type="submit"> Submit</Form.Button>
      </Form>
    );
  };

  vote = (type, post_id) => {
    this.getVoteRequest(type, post_id).then(result => {
      if (result.data.success) {
        this.getAllSubmissions();
      }
    });
  };

  getVoteRequest = (type, post_id) => {
    let params = {};
    params[type] = true;
    params["post_id"] = post_id;
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
              <Menu>
        <Link to="/">
          <Menu.Item header> SprachCafe</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="star outline" color="yellow" size="large" />{" "}
            <Label color="grey">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="handshake outline" color="blue" size="large" />{" "}
            <Label color="grey">3</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="hand peace outline" color="purple" size="large" />{" "}
            <Label color="grey">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="graduation cap" color="yellow" size="large" /> 
            <Label color="yellow">1</Label>
          </Menu.Item>
          <Menu.Item>
            <Icon name="heart outline" color="olive" size="large" /> 
            <Label color="yellow">1</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
        {this.renderSubmissionForm()}
        {this.renderFriendSubmissions(this.state.submissions)}
      </Fragment>
    );
  };
}

AssignmentDetails = withRouter(AssignmentDetails);
export default AssignmentDetails;
