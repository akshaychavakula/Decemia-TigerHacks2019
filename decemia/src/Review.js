import React, { Component } from "react";
// import { UserSession, AppConfig } from "blockstack";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import Display from "./display/Display";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";

import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const redTheme = createMuiTheme({ palette: { primary: red } });
const greenTheme = createMuiTheme({ palette: { primary: green } });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.pallete.text.secondary
  }
}));

const blockstack = require("blockstack");

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: "",
      firebase: "",
      originalName: "",
      approvals: [],
      denials: []
    };
  }

  componentDidMount() {}

  approve() {
    const id = this.state.id;
    const privKey = blockstack.loadUserData().appPrivateKey + "01";
    const hash = blockstack.signProfileToken(id, privKey);
    const username = blockstack.loadUserData().username;

    firebase.default
      .firestore()
      .collection("papers")
      .doc(id)
      .update({
        approvals: {
          [username]: hash
        }
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  deny() {
    const id = this.state.id;
    const privKey = blockstack.loadUserData().appPrivateKey + "01";
    const hash = blockstack.signProfileToken(id, privKey);
    const username = blockstack.loadUserData().username;

    firebase.default
      .firestore()
      .collection("papers")
      .doc(id)
      .update({
        denials: {
          [username]: hash
        }
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
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
      .getFile(id, {
        decrypt: false
      })
      .then(fileContents => {
        console.log(fileContents);
        const data = JSON.parse(fileContents);
        this.setState({
          data: data
        });
      })
      .catch(e => {
        console.log("e");
        console.log(e);
        alert(e.message);
      });

    this.setState({ id: id });
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
          this.setState({
            firebase: doc.data()
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    docRef.get().then(doc => {
      const approvals = doc.data().approvals;
      const denials = doc.data().denials;
      this.setState({ approvals: approvals });
      this.setState({ denials: denials });
      console.log("Approvals" + JSON.stringify(this.state.approvals));
    });
  }

  //    <img src={logo} className="App-logo" alt="logo" />
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={2}>
          <div
            style={{
              backgroundColor: "#000000",
              height: "100vh"
            }}
          >
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={6} sm={7}>
          <Display data={this.state.data} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <h1>{this.state.approvals}</h1>}
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <ThemeProvider theme={redTheme}>
                <Button color="primary" onClick={this.approve.bind(this)}>
                  Approve
                </Button>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={greenTheme}>
                <Button color="secondary" onClick={this.deny.bind(this)}>
                  Deny
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Review;
