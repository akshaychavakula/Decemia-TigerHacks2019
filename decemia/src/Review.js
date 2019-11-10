import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import Display from "./display/Display";
import Button from "@material-ui/core/Button";
<<<<<<< HEAD
import * as firebase from "firebase";
=======
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.pallete.text.secondary,
  },
}));

>>>>>>> 3330fd838cb019d3f61873890ff7fb3a58506d8f
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
<<<<<<< HEAD
          <Button onClick={this.approve.bind(this)}>Approve</Button>
=======
          
          <Grid container spacing={2} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }} >
            <Grid item xs={12}>
            <button>Approve</button>
            </Grid>
            
            <Grid item xs={12}>
            <button>Deny</button>
            </Grid>
          </Grid>
          
>>>>>>> 3330fd838cb019d3f61873890ff7fb3a58506d8f
        </Grid>
      </Grid>
    );
  }
}
export default Review;
