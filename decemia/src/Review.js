import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import Display from "./display/Display";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
const blockstack = require("blockstack");

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      firebase: ""
    };
  }

  componentWillMount() {}

  approve() {
    console.log();
  }

  componentDidMount() {
    var id = "";
    const idParams = this.props.id;
    if (!idParams) {
      id = this.props.match.params.id;
    } else {
      id = idParams;
    }

    console.log(id);

    blockstack
      .getFile(id, { decrypt: false })
      .then(fileContents => {
        console.log(fileContents);
        const data = JSON.parse(fileContents);
        this.setState({ data: data });
      })
      .catch(e => {
        console.log("e");
        console.log(e);
        alert(e.message);
      });

    console.log("ID: " + id);

    var docRef = firebase.default
      .firestore()
      .collection("papers")
      .doc(id);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.setState({ firebase: doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={2}>
          <div style={{ backgroundColor: "#000000", height: "100vh" }}>
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={6} sm={7}>
          <Display data={this.state.data} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button onClick={this.approve.bind(this)}>Approve</Button>
        </Grid>
      </Grid>
    );
  }
}
export default Review;
