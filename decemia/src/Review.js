import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";
import Display from "./display/Display";
import Button from "@material-ui/core/Button";
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

const blockstack = require("blockstack");

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentWillMount() {}

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
          
          <Grid container spacing={2} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }} >
            <Grid item xs={12}>
            <button>Approve</button>
            </Grid>
            
            <Grid item xs={12}>
            <button>Deny</button>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    );
  }
}
export default Review;
