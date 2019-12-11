import React, { Fragment } from "react";
import Axios from "axios";

import {
  Grid,
  Label,
  Message,
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

class Dashboard extends React.Component {
  state = {
    assignments: [
      {
        header: "Write about your trip to England",
        keyword: "afrikanische",
        deadline: "123",
      }
    ]
  };

  componentDidMount = () => {
    this.getActiveAssignmentsRequest().then(result => {
      // header, mongoid, keyword, created, deadline, submission 
      this.setState({
        assignments: result.data.assignments
      })
    });
  };

  getActiveAssignmentsRequest = () => {
    return Axios({
      method: "get",
      url: "http://127.0.0.1:8000" + "/user/assigments",
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
      <Grid.Column width={8}>
        <Card style={{ marginTop: "16px" }}>
          <Card.Content>
            <Card.Header>{assignment.header}</Card.Header>
          </Card.Content>
          <Card.Content>
            1 <Icon name="star outline" color="yellow" size="large" />
            2 <Icon name="handshake outline" color="blue" size="large" />
            1 <Icon name="hand peace outline" color="purple" size="large" />
          </Card.Content>
          <Card.Content extra> {assignment.deadline}</Card.Content>
          <Card.Content extra> {assignment.submission}</Card.Content>
        </Card>
      </Grid.Column>
    );
  };

  renderAssignments = assignments => {
    return assignments.map(assignment => this.renderAssignment(assignment));
  };

  renderNewAssignmentForm = () => {
    return (
      <Popup
        on="click"
        trigger={
          <Button floated="right" icon labelPosition="right">
            {" "}
            <Icon name="plus"></Icon> new assignment
          </Button>
        }
        content={
          <Form onSubmit={this.createNewAssignment}>
            <Header> Createw new assignment</Header>
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
              <Form.Button type="submit">Create assignment</Form.Button>
            </Form.Group>
          </Form>
        }
      ></Popup>
    );
  };

  render = () => {
    return (
      <Fragment>
        {this.renderNewAssignmentForm()}
        <Grid>
          <Grid.Row>
            <Grid.Column width={10} textAlign="right">
              Awards 13 <Icon name="star outline" color="yellow" size="large" />
              13 <Icon name="handshake outline" color="blue" size="large" />
              13 <Icon name="hand peace outline" color="purple" size="large" />
            </Grid.Column>
            <Grid.Column width={6}>
              Trophies 13{" "}
              <Icon name="graduation cap" color="yellow" size="large" />
              13 <Icon name="heart outline" color="olive" size="large" />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />
        <Grid padded relaxed>
          <Grid.Row>{this.renderAssignments(this.state.assignments)}</Grid.Row>
        </Grid>
      </Fragment>
    );
  };
}

export default Dashboard;
