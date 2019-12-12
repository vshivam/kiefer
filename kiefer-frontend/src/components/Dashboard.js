import React, { Fragment } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Grid,
  Label,
  Menu,
  Icon,
  Form,
  TextArea,
  Header,
  Popup,
  Card
} from "semantic-ui-react";
import { withRouter } from "react-router";
import "./dashboard.css";

class Dashboard extends React.Component {
  state = {
    assignments: [
      {
        header: "Write about your trip to England",
        keyword: "afrikanische",
        deadline: "123"
      }
    ]
  };

  componentDidMount = () => {
    this.getActiveAssignmentsRequest().then(result => {
      // header, mongoid, keyword, created, deadline, submission
      this.setState({
        assignments: result.data.assignments
      });
    });
  };

  getActiveAssignmentsRequest = () => {
    return Axios({
      method: "get",
      url: "http://127.0.0.1:8000" + "/user/assignments",
      withCredentials: true
    });
  };

  onNewAssignmentFormChange = (e, { name, value }) =>
    this.setState({ [name]: value });

  createNewAssignment = () => {
    this.getCreateAssignmentRequest(
      this.state.assignment_header,
      this.state.assignment_keywords,
      this.state.assignment_days
    ).then(result => {
      if (result.data.success) {
        console.log(result.data);
        this.state.assignments.push({
          heading: this.state.assignment_header,
          tag: this.state.assignment_keywords,
          day: this.state.assignment_days
        });
      }
    });
  };

  getCreateAssignmentRequest = (header, keywords, days) => {
    return Axios({
      method: "post",
      url: "http://127.0.0.1:8000" + "/user/create_assignment",
      params: {
        header: header,
        keywords: keywords,
        day: days
      },
      withCredentials: true
    });
  };

  renderAssignment = assignment => {
    return (
      <Grid.Column width={4}>
        <Link
          to={{
            pathname: "/assignment_details",
            assignment: assignment, 
            user: this.props.location.user
          }}
        >
          <Card style={{ marginTop: "16px" }} className="grow" color="yellow">
            <Card.Content>
              <Card.Header>{assignment.header}</Card.Header>
            </Card.Content>
            <Card.Content>
              1 <Icon name="star outline" color="yellow" size="large" />
              2 <Icon name="handshake outline" color="blue" size="large" />
              1 <Icon name="hand peace outline" color="purple" size="large" />
            </Card.Content>
            <Card.Content extra> {assignment.keywords}</Card.Content>
            <Card.Content extra> {assignment.deadline}</Card.Content>
          </Card>
        </Link>
      </Grid.Column>
    );
  };

  renderAssignments = assignments => {
    return assignments.map(assignment => this.renderAssignment(assignment));
  };

  renderNewAssignmentForm = () => {
    return (
      <Grid.Column width={4}>
        <Popup
          on="click"
          trigger={
            <Card style={{ marginTop: "16px" }} color="green">
              <Card.Content>
                <Card.Header> Create new assignment</Card.Header>
              </Card.Content>
              <Card.Content>
                <Icon name="plus"> </Icon>
              </Card.Content>
            </Card>
          }
          content={
            <Form onSubmit={this.createNewAssignment}>
              <Header> Create a new assignment</Header>
              <Form.Field>
                <label>what should the students write about ?</label>
                <TextArea
                  name="assignment_header"
                  onChange={this.onNewAssignmentFormChange}
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <label>give students new words to learn!</label>
                  <Form.Input
                    name="assignment_keywords"
                    onChange={this.onNewAssignmentFormChange}
                  ></Form.Input>
                </Form.Field>
                <Form.Field>
                  <label> days to submission</label>
                  <Form.Input
                    name="assignment_days"
                    onChange={this.onNewAssignmentFormChange}
                  ></Form.Input>
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Form.Button type="submit">Create assignment</Form.Button>
              </Form.Field>
            </Form>
          }
        ></Popup>
      </Grid.Column>
    );
  };

  render = () => {
    console.log(typeof this.props.location.user);
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
        <Grid padded relaxed>
          <Grid.Row>
            {typeof this.props.location.user !== "undefined" &&
            this.props.location.user.role === "teacher"
              ? this.renderNewAssignmentForm()
              : null}
            {this.renderAssignments(this.state.assignments)}
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  };
}

Dashboard = withRouter(Dashboard);
export default Dashboard;
