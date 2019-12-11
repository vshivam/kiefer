import React, { Fragment } from "react";
import Axios from "axios";

import { Grid, Label, Message, Table, Tab, Icon } from "semantic-ui-react";

class Dashboard extends React.Component {
  state = {
    assignments: [
      {
        heading: "Write about your trip to England",
        text: "",
        doc: "",
        dos: ""
      },
      {
        heading: "Write about your trip to England",
        text: "",
        doc: "",
        dos: ""
      },
      {
        heading: "Write about your trip to England",
        text: "",
        doc: "",
        dos: ""
      }
    ]
  };

  componentDidMount = () => {
      this.getActiveAssignmentsRequest().then(result => {
          console.log(result.data)
      })
  }

  getActiveAssignmentsRequest = () => {
    return Axios({
        method: "get",
        url: "http://127.0.0.1:8000" + "/user/assigments",
        withCredentials: true
    })
  };

  renderAssignment = assignment => {
    return (
      <Table.Row>
        <Table.Cell>{assignment.heading}</Table.Cell>{" "}
        <Table.Cell>2 submissions already</Table.Cell>
        <Table.Cell>3 days to submission</Table.Cell>
      </Table.Row>
    );
  };

  renderAssignments = assignments => {
    return assignments.map(assignment => this.renderAssignment(assignment));
  };

  render = () => {
    return (<Fragment>
                <Grid> 
                    <Grid.Row>
                        <Grid.Column>
                            13 <Icon name="star outline" color="yellow" size="large"/>
                        </Grid.Column>
                        <Grid.Column>
                            13 <Icon name="handshake outline" color="olive" size="large"/>
                        </Grid.Column>
                        <Grid.Column>
                            13 <Icon name="hand peace outline" color="purple" size="large"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table celled>
                    <Table.Body>
                    {this.renderAssignments(this.state.assignments)}
                    </Table.Body>
                </Table>
                </Fragment>

    );
  };
}

export default Dashboard;
